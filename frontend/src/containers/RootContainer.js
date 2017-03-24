import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from '../routes'

const RootContainer = ({ store }) => {
    const history = syncHistoryWithStore(browserHistory, store)

    return (
        <Provider {...{ store }} >
            <Router path="/" {...{ history }} routes={routes} />
        </Provider>
    )
}

RootContainer.propTypes = {
    store: PropTypes.shape({}).isRequired,
}

export default RootContainer
