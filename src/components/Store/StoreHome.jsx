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

const StoreHome = () => {
	const { state } = useContext(AuthContext);

	const [stores, setStores] = useState([]);
	useEffect(() => {
		GetStoreQuery('username', state.user.username).then((data) => {
			setStores(data);
		});
		// return () => {
		// 	cleanup
		// }
	}, []);

	const storeList = stores.map((store, index) => {
		console.log(store);
		return (
			<Grid key={index} item xs={12}>
				<StoreCard store={store} />
			</Grid>
		);
	});

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
				<Grid xs={5}>{storeList}</Grid>
			</Grid>

			<Switch>
				<Route path="/store/create">
					<CreateStoreForm />
				</Route>
			</Switch>
		</>
	);
};

export default StoreHome;
