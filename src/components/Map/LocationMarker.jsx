import React, { useState, useEffect, useContext } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

const LocationMarker = ({ storeLocations }) => {
	return storeLocations.map((store, index) => {
		const [longitude, latitude] = store.location.coordinates;
		const dist = store.dist.calculated.toFixed(2);
		return (
			<Marker key={index} position={{ lat: latitude, lng: longitude }}>
				<InfoWindow>
					<>
						<div>{store.storeName}</div>
						<div>distance: {dist}m away</div>
					</>
				</InfoWindow>
			</Marker>
		);
	});
};

export default LocationMarker;
