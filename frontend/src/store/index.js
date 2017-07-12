import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

export default function configureStore(rootReducer, initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [
        applyMiddleware(
            routerMiddleware(browserHistory),
            sagaMiddleware,
            thunk,
        ),
    ];

    if (process.env.NODE_ENV === 'production') {
        const devtools = window.devToolsExtension
            ? window.devToolsExtension()
            : f => f;

        middlewares.push(devtools);
    }

    return createStore(rootReducer, initialState, compose(...middlewares));
}
