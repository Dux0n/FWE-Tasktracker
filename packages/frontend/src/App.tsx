import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './components/GlobalStyle';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { TaskPage } from './pages/Task/TaskPage';
import './style.css';
import { theme } from './theme';

export const App = () => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<BrowserRouter>
					<Route exact={true} path="/" component={DashboardPage} />
					<Route exact={true} path="/taskpage/:id" component={TaskPage} />
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
};
