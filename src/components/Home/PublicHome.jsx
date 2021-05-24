import React, { useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import {
	Grid,
	IconButton,
	Input,
	InputLabel,
	InputAdornment,
	Button,
	Typography,
} from '@material-ui/core';
// import useStyles from './XXXForm.styles';
import { Formik, useFormik } from 'formik';
import { AuthContext } from '../../contexts/AuthContext';
import GetAllStore from '../../endpoints/GetAllStore';
import { Link, useHistory } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import StoreCard from '../../components/Store/StoreCard';
import { useQuery } from 'react-query';
import { STORES } from '../../constants/queryKeys';

const PublicHome = () => {
	const { isLoading, isError, data, error } = useQuery(STORES, () =>
		GetAllStore().then((stores) =>
			stores.map((store, index) => (
				<Grid key={index} item xs={12}>
					<StoreCard store={store} />
				</Grid>
			))
		)
	);
	isLoading && console.log('Loading...');
	isError && console.log('There is an error:', error);

	return (
		<>
			<Grid container alignItems="center" direction="column" wrap>
				<Grid items xs={12}>
					<Typography color="textPrimary" variant="h5">
						All the GoodFoods in SG!
					</Typography>
				</Grid>
				<Grid xs={5}>{data}</Grid>
			</Grid>
		</>
	);
};

export default PublicHome;
