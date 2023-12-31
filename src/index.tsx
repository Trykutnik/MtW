import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { AuthProvider } from './authentification/authProvider';
import { store } from './redux/store';
import { ThemeProvider } from './themes/ThemeProvider';
import App from './App';

import './fonts/fonts.scss';
import './index.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<Provider store={store}>
		<ThemeProvider>
			<AuthProvider>
				<App />
				<div className={'background-noise'}></div>
			</AuthProvider>
		</ThemeProvider>
	</Provider>,
);
