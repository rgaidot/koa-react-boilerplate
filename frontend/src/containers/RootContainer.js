import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from '../routes';

const RootContainer = ({ store }) => {
    const history = syncHistoryWithStore(hashHistory, store);

    return (
        <Provider {...{ store }}>
            <Router {...{ history }}>{routes}</Router>
        </Provider>
    );
};

RootContainer.propTypes = {
    store: PropTypes.object.isRequired,
};

export default RootContainer;
