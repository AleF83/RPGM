/* global document */
import React from 'react';
import { render } from 'react-dom';
import nconf from 'nconf';

import App from './components/App';

nconf
	.argv()
	.env()
	.file('./configuration.json');

render(<App />, document.getElementById('root'));
