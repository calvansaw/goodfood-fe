import React, { useState, useEffect, useContext } from 'react';
import { LocationContext } from '../../contexts/LocationContext';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
} from 'react-google-maps';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_MAP_API_KEY);

const reducer = (accumulator, currentValue) => {
	if (
		currentValue.formatted_address.length >
		accumulator.formatted_address.length
	) {
		return currentValue;
	} else return accumulator;
};

const Map = withScriptjs(
	withGoogleMap(({ storeLocations }) => {
		const { state, dispatch } = useContext(LocationContext);
		const handleDragEnd = (event) => {
			const lng = event.latLng.lng();
			const lat = event.latLng.lat();
			console.log(lng, lat);

			Geocode.fromLatLng(lat, lng).then((res) => {
				const addressObj = res.results.reduce(reducer);
				console.log(res);
				console.log(addressObj);

				dispatch({
					type: 'SHIFT',
					data: { lat, lng, markerPosn: addressObj },
				});
			});
		};

		return (
			<GoogleMap
				defaultZoom={17}
				defaultCenter={{
					lat: 1.2864939063899405,
					lng: 103.81760895252228,
				}}
			>
				<Marker
					position={{
						lat: state.lat,
						lng: state.lng,
					}}
					draggable
					onDragEnd={handleDragEnd}
				>
					<InfoWindow>
						<div>You are here!</div>
					</InfoWindow>
				</Marker>
				{storeLocations &&
					storeLocations.map((store, index) => {
						const [longitude, latitude] =
							store.location.coordinates;
						const dist = store.dist.calculated.toFixed(2);
						return (
							<Marker
								key={index}
								position={{ lat: latitude, lng: longitude }}
							>
								<InfoWindow>
									<>
										<div>{store.storeName}</div>
										<div>distance: {dist}m away</div>
									</>
								</InfoWindow>
							</Marker>
						);
					})}
			</GoogleMap>
		);
	})
);

export default Map;
