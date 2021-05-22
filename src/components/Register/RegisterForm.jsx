import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import {
	IconButton,
	Input,
	InputLabel,
	InputAdornment,
	FormControlLabel,
	Radio,
	FormHelperText,
	Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import useStyles from './RegisterForm.styles';
import { useFormik } from 'formik';
import Register from '../../endpoints/Register';
import { AuthContext } from '../../contexts/AuthContext';

const RegisterForm = () => {
	const { state, dispatch } = useContext(AuthContext);
	const { values, handleChange, handleSubmit } = useFormik({
		initialValues: {
			username: '',
			password: '',
			userType: '',
		},
		onSubmit: async (values) => {
			console.log(values);
			const data = await Register(
				values.username,
				values.password,
				values.userType
			);
			console.log(data);
			data &&
				dispatch({
					type: 'REGISTER',
					data,
				});
		},
	});

	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};
	console.log(state);
	return (
		<form onSubmit={handleSubmit}>
			<InputLabel htmlFor="username">Username</InputLabel>
			<Input
				className={clsx(classes.margin, classes.textField)}
				id="username"
				name="username"
				type="text"
				value={values.username}
				onChange={handleChange}
			/>
			<InputLabel htmlFor="password">Password</InputLabel>
			<Input
				className={clsx(classes.margin, classes.textField)}
				id="password"
				name="password"
				type={showPassword ? 'text' : 'password'}
				value={values.password}
				onChange={handleChange}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
						>
							{values.showPassword ? (
								<Visibility />
							) : (
								<VisibilityOff />
							)}
						</IconButton>
					</InputAdornment>
				}
			/>
			<FormControlLabel
				value="end"
				control={
					<Radio
						color="primary"
						id="userType"
						name="userType"
						value="owner"
						onChange={handleChange}
						checked={values.userType === 'owner'}
					/>
				}
				label="owner"
			/>
			<FormControlLabel
				value="end"
				control={
					<Radio
						color="primary"
						id="userType"
						name="userType"
						value="public"
						onChange={handleChange}
						checked={values.userType === 'public'}
					/>
				}
				label="public"
			/>
			<FormHelperText>
				Select Owner to start registering your store with us!
			</FormHelperText>
			<Button type="submit">Submit</Button>
		</form>
	);
};

export default RegisterForm;
