import React from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import RegisterForm from './components/Register/RegisterForm';
import AuthContextProvider from './contexts/AuthContext';
import ThemeContextProvider from './contexts/ThemeContext';

const App = () => {
	return (
		<AuthContextProvider>
			<ThemeContextProvider>
				<Router>
					<div className="App">
						<Navbar />
						<div className="content">
							<Switch>
								<Route path="/signin">
									<LoginForm />
								</Route>
								<Route path="/register">
									<RegisterForm />
								</Route>
							</Switch>
						</div>
					</div>
				</Router>
			</ThemeContextProvider>
		</AuthContextProvider>
	);
};

export default App;
