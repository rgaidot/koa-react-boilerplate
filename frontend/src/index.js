import React from 'react';
import { render } from 'react-dom';

import RootContainers from './containers/RootContainer';

import rootStore from './store';
import rootReducer from './reducers';

const store = rootStore(rootReducer);
const rootElement = document.getElementById('root');

render(<RootContainers {...{ store }} />, rootElement);
