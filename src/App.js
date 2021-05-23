import React, { useContext, useMemo } from 'react';
import LoginForm from './components/Login/LoginForm';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import RegisterForm from './components/Register/RegisterForm';
import { AuthContext } from './contexts/AuthContext';
import StoreHome from './components/Store/StoreHome';
import PublicHome from './components/Home/PublicHome';

const App = () => {
	const { state } = useContext(AuthContext);

	const { isAuth, isOwner } = useMemo(
		() => ({
			isAuth: state.isAuth,
			isOwner: state.user?.userType === 'owner',
		}),
		[state]
	);

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
					<Route path="/store">
						{isOwner ? <StoreHome /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/">
						<PublicHome />
					</Route>
				</Switch>
			</div>
		</div>
	);
};

export default App;
