import {createStore, applyMiddleware, compose } from 'redux';
import personalApp from '../reducers';
import thunk from 'redux-thunk'
import invariant from 'redux-immutable-state-invariant';

console.log(process.env.NODE_ENV)
export default function configureStore(initialState) {
    const middleware = process.env.NODE_ENV !== 'production' ?
        [require('redux-immutable-state-invariant')(), thunk]:[thunk];

    const tools = process.env.NODE_ENV !== 'production' ? (global.devToolsExtension? global.devToolsExtension(): () => {}):() => {};

    const store = createStore(personalApp, initialState, compose(
        applyMiddleware(...middleware),
    ));

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers')
            store.replaceReducer(nextReducer)
        });
    }

    return store;
}
