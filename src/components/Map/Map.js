import React from 'react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
} from 'react-google-maps';

const Map = withScriptjs(
	withGoogleMap((props) => {
		const handleDragEnd = (event) => {
			const { lat, lng } = event.latLng;
			console.log(lng(), lat());
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
						lat: 1.2864939063899405,
						lng: 103.81760895252228,
					}}
					draggable
					onDragEnd={handleDragEnd}
				>
					<InfoWindow>
						<div>test: you are here</div>
					</InfoWindow>
				</Marker>
			</GoogleMap>
		);
	})
);

export default Map;
