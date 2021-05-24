import React, { useState, useCallback, useContext } from 'react';
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
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';

const RegisterForm = () => {
	const { state, dispatch } = useContext(AuthContext);
	const { enqueueSnackbar } = useSnackbar();
	const { mutate } = useMutation(
		(user) => Register(user.username, user.password, user.userType),
		{
			onError: () => {
				enqueueSnackbar('Something went wrong, please try again!', {
					variant: 'error',
				});
			},
			onSuccess: (data) => {
				console.log(data);
				dispatch({
					type: 'REGISTER',
					data,
				});
				enqueueSnackbar('User registered!', {
					variant: 'success',
				});
			},
		}
	);

	const submit = useCallback((values) => {
		mutate(values);
	}, []);

	const { values, handleChange, handleSubmit } = useFormik({
		initialValues: {
			username: '',
			password: '',
			userType: '',
		},
		onSubmit: submit,
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
