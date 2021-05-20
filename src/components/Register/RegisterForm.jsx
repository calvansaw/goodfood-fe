import React, { useState } from 'react';
import clsx from 'clsx';
import {
	IconButton,
	Input,
	InputLabel,
	InputAdornment,
	Select,
	FormHelperText,
	MenuItem,
	Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import useStyles from './RegisterForm.styles';
import { useFormik } from 'formik';
import Register from '../../endpoints/Register';

const RegisterForm = () => {
	const { values, handleChange, handleSubmit } = useFormik({
		initialValues: {
			username: '',
			password: '',
			userType: '',
		},
		onSubmit: (values) => {
			console.log(values);
			Register(values.username, values.password, values.userType);
		},
	});

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
			<InputLabel id="userType">User Type</InputLabel>
			<Select
				className={clsx(classes.selectField)}
				labelId="userType"
				id="userType"
				name="userType"
				value={values.userType}
				onChange={handleChange}
			>
				<MenuItem value="owner">Owner</MenuItem>
				<MenuItem value="public">Public</MenuItem>
			</Select>
			<FormHelperText>
				Select Owner to start registering your store with us!
			</FormHelperText>
			<Button type="submit">Submit</Button>
		</form>
	);
};

export default RegisterForm;
