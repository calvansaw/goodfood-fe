import React, { useState, useContext, useEffect, useMemo } from 'react';
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
import GetStoreQuery from '../../endpoints/GetStoreQuery';
import { Link, useHistory } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import StoreCard from './StoreCard';
import { useQuery } from 'react-query';
import { STORES } from '../../constants/queryKeys';

const StoreHome = ({ stores }) => {
	const { state } = useContext(AuthContext);
	// const {
	// 	isLoading,
	// 	isError,
	// 	data: stores,
	// 	error,
	// } = useQuery(STORES, () =>
	// 	GetStoreQuery('username', state.user.username).then((stores) =>

	// 	)
	// );

	// isLoading && console.log('Loading...');
	// isError && console.log('There is an error:', error);

	const userStores = useMemo(
		() => stores.filter((store) => store.username === state.user.username),
		[stores, state.user.username]
	);

	console.log(stores);
	return (
		<>
			<Grid container alignItems="center" direction="column" wrap>
				<Grid item xs={12}>
					<Typography color="textPrimary" variant="h5">
						Your Store Homepage!
					</Typography>
				</Grid>
				<Grid item>
					<Link to="/store/create">
						<Button>Create Store</Button>
					</Link>
				</Grid>
			</Grid>

			<Grid container alignItems="center" direction="column">
				<Grid item xs={6}>
					{userStores.map((store, index) => (
						<Grid key={index} item xs={12}>
							<StoreCard store={store} />
						</Grid>
					))}
				</Grid>
			</Grid>
		</>
	);
};

export default StoreHome;
