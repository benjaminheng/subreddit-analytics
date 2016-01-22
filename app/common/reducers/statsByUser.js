import { REQUEST_USER_STATS, RECEIVE_USER_STATS } from "../actions";
import Immutable from 'immutable';

const userInitialState = Immutable.fromJS({
    isFetching: false,
    lastUpdated: 0,
    stats: {}
});

function username(state = userInitialState, action) {
    switch (action.type) {
        case REQUEST_USER_STATS:
            return state.set('isFetching', true);
        case RECEIVE_USER_STATS:
            return state.merge({
                isFetching: false,
                lastUpdated: action.receivedAt,
                stats: action.stats
            });
        default:
            return state;
    }
}

export default function statsByUser(state = Immutable.Map(), action) {
    switch (action.type) {
        case REQUEST_USER_STATS:
        case RECEIVE_USER_STATS:
            return state.set(action.username, username(state.get(action.username), action));
        default:
            return state;
    }
}
