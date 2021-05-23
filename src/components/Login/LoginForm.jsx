import React, { useState, useContext } from 'react';
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
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
	let history = useHistory();
	const { state, dispatch } = useContext(AuthContext);
	const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		onSubmit: async (values) => {
			console.log(values);
			const data = await SignIn(values.username, values.password);
			console.log(data);
			data &&
				dispatch({
					type: 'LOGIN',
					data,
				});
			history.push('/');
		},
	});
	console.log(state);
	console.log('is submitting form:', isSubmitting);
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
