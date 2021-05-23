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

const PublicHome = () => {
	const [stores, setStores] = useState([]);
	useEffect(() => {
		GetAllStore().then((data) => {
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
					<Typography color="textPrimary" variant="h5">
						All the GoodFoods in SG!
					</Typography>
				</Grid>
				<Grid xs={5}>{storeList}</Grid>
			</Grid>
		</>
	);
};

export default PublicHome;
