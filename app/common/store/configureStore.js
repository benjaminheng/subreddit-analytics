import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import Immutable from 'immutable';
import rootReducer from '../reducers';

const logger = createLogger({
    transformer: state => {
        var newState = {};
        Object.keys(state).forEach(key => {
            if (Immutable.Iterable.isIterable(state[key])) {
                newState[key] = state[key].toJS();
            } else {
                newState[key] = state[key];
            }
        });
        return newState;
    }
});

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}
