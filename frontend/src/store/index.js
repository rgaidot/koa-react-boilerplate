import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

export default function configureStore(rootReducer, initialState) {
    const middlewares = applyMiddleware(
        routerMiddleware(browserHistory),
        thunk,
    );

    const devtools = window.devToolsExtension
        ? window.devToolsExtension()
        : f => f;

    return createStore(
        rootReducer,
        initialState,
        compose(middlewares, devtools),
    );
}
