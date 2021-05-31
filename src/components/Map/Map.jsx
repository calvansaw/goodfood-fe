import React, { useState, useEffect } from 'react';
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
	withGoogleMap((props) => {
		const [currentPosn, setCurrentPosn] = useState({});

		const handleDragEnd = (event) => {
			const lng = event.latLng.lng();
			const lat = event.latLng.lat();
			console.log(lng, lat);

			Geocode.fromLatLng(lat, lng).then((res) => {
				const addressObj = res.results.reduce(reducer);
				console.log(res);
				console.log(addressObj);
			});
		};

		useEffect(() => {
			navigator.geolocation.getCurrentPosition((posn) => {
				setCurrentPosn({
					lat: posn.coords.latitude,
					lng: posn.coords.longitude,
				});
			});
		}, []);

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
						lat: currentPosn.lat,
						lng: currentPosn.lng,
					}}
					draggable
					onDragEnd={handleDragEnd}
				>
					<InfoWindow>
						<div>You are here!</div>
					</InfoWindow>
				</Marker>
			</GoogleMap>
		);
	})
);

export default Map;
