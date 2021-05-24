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
import GetStoreQuery from '../../endpoints/GetStoreQuery';
import { Link, useHistory } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import CreateStoreForm from './CreateStoreForm';
import StoreCard from './StoreCard';
import { useQuery } from 'react-query';
import { STORES } from '../../constants/queryKeys';

const StoreHome = () => {
	const { state } = useContext(AuthContext);
	const { isLoading, isError, data, error } = useQuery(STORES, () =>
		GetStoreQuery('username', state.user.username).then((stores) =>
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
					<Link to="/store">
						<Button size="large">
							<Typography color="textPrimary" variant="h5">
								Your Store Homepage!
							</Typography>
						</Button>
					</Link>
					<Grid item>
						<Link to="/store/create">
							<Button> Create Store</Button>
						</Link>
					</Grid>
				</Grid>
			</Grid>

			<Switch>
				<Route exact path="/store">
					<Grid container alignItems="center" direction="column">
						<Grid item xs={6}>
							{data}
						</Grid>
					</Grid>
				</Route>
				<Route path="/store/create">
					<Grid container alignItems="center" direction="column">
						<Grid item xs={5}>
							<CreateStoreForm />
						</Grid>
					</Grid>
				</Route>
			</Switch>
		</>
	);
};

export default StoreHome;
