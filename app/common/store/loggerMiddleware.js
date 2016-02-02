import createLogger from 'redux-logger';
import Immutable from 'immutable';

const logger = createLogger({
    collapsed: true,
    logger: console,
    stateTransformer: state => {
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

export default logger;
