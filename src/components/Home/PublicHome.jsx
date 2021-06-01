import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { LOCATIONS } from '../../constants/queryKeys';
import GetLocations from '../../endpoints/GetLocations';
import { useSnackbar } from 'notistack';
import { Grid, Typography } from '@material-ui/core';
import StoreCard from '../Store/StoreCard';
import Map from '../Map/Map';

const PublicHome = ({ stores, locations }) => {
	const [currentPosn, setCurrentPosn] = useState({});

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((posn) => {
			setCurrentPosn({
				lat: posn.coords.latitude,
				lng: posn.coords.longitude,
			});
		});
	}, []);

	return (
		<Grid container direction="row">
			<Grid item xs={6}>
				<Grid container alignItems="center" direction="column" wrap>
					<Grid item xs={12}>
						<Typography color="textPrimary" variant="h5">
							All the GoodFoods in SG!
						</Typography>
					</Grid>
					<Grid xs={6}>
						{stores.map((store, index) => (
							<Grid key={index} item xs={12}>
								<StoreCard store={store} />
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6}>
				<Map
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={
						<div
							style={{
								position: 'fixed',
								width: '45%',
								height: '60%',
								top: '15%',
								right: '2%',
							}}
						/>
					}
					mapElement={<div style={{ height: `100%` }} />}
					currentPosn={currentPosn}
					storeLocations={locations}
				/>
			</Grid>
		</Grid>
	);
};

export default PublicHome;
