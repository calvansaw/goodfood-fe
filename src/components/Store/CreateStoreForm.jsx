import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import {
	Grid,
	IconButton,
	Input,
	InputLabel,
	InputAdornment,
	Button,
} from '@material-ui/core';
import useStyles from './CreateStoreForm.styles';
import { Formik, useFormik } from 'formik';
import { AuthContext } from '../../contexts/AuthContext';
import CreateStore from '../../endpoints/CreateStore';
import { useHistory } from 'react-router-dom';

const CreateStoreForm = () => {
	let history = useHistory();
	const { state, dispatch } = useContext(AuthContext);
	const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
		initialValues: {
			storeName: '',
			storeDesc: '',
			storeImg: '',
		},
		onSubmit: async (values) => {
			console.log(values);
			const data = await CreateStore(
				values.storeName,
				values.storeDesc,
				values.storeImg,
				state.user.username
			);
			console.log(data);
			// data &&
			// 	dispatch({
			// 		type: 'XXX',
			// 		data,
			// 	});
			history.push('/store');
		},
	});
	const classes = useStyles();

	return (
		<form onSubmit={handleSubmit}>
			<Grid container className={classes.margin}>
				<Grid item xs={12}>
					<InputLabel htmlFor="storeName">Store Name</InputLabel>
					<Input
						className={clsx(classes.margin, classes.textField)}
						id="storeName"
						name="storeName"
						type="text"
						value={values.storeName}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<InputLabel htmlFor="storeDesc">
						Store Description
					</InputLabel>
					<Input
						className={clsx(classes.margin, classes.textField)}
						id="storeDesc"
						name="storeDesc"
						type="text"
						value={values.storeDesc}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<InputLabel htmlFor="storeImg">Store Image</InputLabel>
					<Input
						className={clsx(classes.margin, classes.textField)}
						id="storeImg"
						name="storeImg"
						type="text"
						value={values.storeImg}
						onChange={handleChange}
					/>
				</Grid>
			</Grid>
			<Button type="submit">Submit</Button>
		</form>
	);
};

export default CreateStoreForm;
