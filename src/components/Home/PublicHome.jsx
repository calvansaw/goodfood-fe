import React, { useState, useContext, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import StoreCard from '../Store/StoreCard';

const PublicHome = ({ data }) => {
	return (
		<>
			<Grid container alignItems="center" direction="column" wrap>
				<Grid items xs={12}>
					<Typography color="textPrimary" variant="h5">
						All the GoodFoods in SG!
					</Typography>
				</Grid>
				<Grid xs={5}>
					{data.map((store, index) => (
						<Grid key={index} item xs={12}>
							<StoreCard store={store} />
						</Grid>
					))}
				</Grid>
			</Grid>
		</>
	);
};

export default PublicHome;
