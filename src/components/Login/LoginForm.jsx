import React, { useState, useCallback, useContext } from 'react';
import clsx from 'clsx';
import {
	IconButton,
	Input,
	InputLabel,
	InputAdornment,
	Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import useStyles from './LoginForm.styles';
import { useFormik } from 'formik';
import { AuthContext } from '../../contexts/AuthContext';
import SignIn from '../../endpoints/SignIn';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
// import { useHistory} from 'react-router-dom';

const LoginForm = () => {
	// let history = useHistory();
	const { state, dispatch } = useContext(AuthContext);
	const { enqueueSnackbar } = useSnackbar();
	const { mutate } = useMutation(
		(user) => SignIn(user.username, user.password),
		{
			onError: () => {
				enqueueSnackbar('Something went wrong, please try again!', {
					variant: 'error',
				});
			},
			onSuccess: (data) => {
				console.log(data);
				dispatch({
					type: 'LOGIN',
					data,
				});
				enqueueSnackbar('Login successful!', {
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
		},
		onSubmit: submit,
	});

	console.log(state);

	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

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
			<Button type="submit">Submit</Button>
		</form>
	);
};

export default LoginForm;
