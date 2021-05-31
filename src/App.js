import React, { useContext, useMemo } from 'react';
import LoginForm from './components/Login/LoginForm';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import RegisterForm from './components/Register/RegisterForm';
import { AuthContext } from './contexts/AuthContext';
import StoreHome from './components/Store/StoreHome';
import PublicHome from './components/Home/PublicHome';
import MenuHome from './components/Store/MenuHome';
import { useQuery } from 'react-query';
import { STORES } from './constants/queryKeys';
import GetAllStore from './endpoints/GetAllStore';
import { Grid } from '@material-ui/core';
import StoreCard from './components/Store/StoreCard';
import CreateStoreForm from './components/Store/CreateStoreForm';
import CreateFoodForm from './components/Store/CreateFoodForm';

const App = () => {
	const { state } = useContext(AuthContext);
	const { isLoading, isError, data, error } = useQuery(
		STORES,
		() => GetAllStore(),
		{ refetchOnWindowFocus: false }
	);
	isLoading && console.log('Loading...');
	isError && console.log('There is an error:', error);

	const { isAuth, isOwner } = useMemo(
		() => ({
			isAuth: state.isAuth,
			isOwner: Boolean(state.user?.userType === 'owner'),
		}),
		[state]
	);

	console.log(state);
	console.log(isAuth);
	console.log(isOwner);
	console.log(data);

	return (
		<div className="App">
			<Navbar />
			<div className="content">
				<Switch>
					<Route path="/signin">
						{isAuth ? <Redirect to="/" /> : <LoginForm />}
					</Route>
					<Route path="/register">
						{isAuth ? <Redirect to="/" /> : <RegisterForm />}
					</Route>
					<Route exact path="/store/create">
						<CreateStoreForm />
					</Route>
					<Route exact path="/store/menu/:id">
						{data && <MenuHome data={data} />}
					</Route>
					<Route exact path="/store">
						{isOwner && data ? (
							<StoreHome data={data} />
						) : (
							<Redirect to="/" />
						)}
					</Route>
					<Route exact path="/food/create/:id">
						<CreateFoodForm />
					</Route>
					<Route exact path="/">
						{data && <PublicHome data={data} />}
					</Route>
				</Switch>
			</div>
		</div>
	);
};

export default App;
