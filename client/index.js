import React from 'react';
import ReactDOM from 'react-dom';
import './favicon.ico';
import App from './app/App';
import { Provider } from 'mobx-react';
import * as stores from 'store';

ReactDOM.render(
	<Provider {...stores}>
		<App />
	</Provider>,
	document.getElementById('root')
);
