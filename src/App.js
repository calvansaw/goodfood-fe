import React from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import RegisterForm from './components/Register/RegisterForm';

const App = () => {
	return (
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
	);
};

export default App;
