import { REQUEST_STATS, RECEIVE_STATS } from "../actions";
import Immutable from 'immutable';

function stats(state, action) {
    if (typeof state === 'undefined') {
        return Immutable.fromJS({
            isFetching: false
        });
    }

    switch (action.type) {
        case REQUEST_STATS:
            return state.set(isFetching, true);
        case RECEIVE_STATS:
            return state.merge(Immutable.Map({
                isFetching: false,
                lastUpdated: action.receivedAt,
                totals: action.stats.totals
            }));
        default:
            return state;
    }
}

export default function statsByPeriod(state, action) {
    if (typeof state === 'undefined') {
        return Immutable.fromJS({});
    }

    switch (action.type) {
        case RECEIVE_STATS:
        case REQUEST_STATS:    // load period stats from database
            state.set(action.period, stats(state.get(action.period), action));
        default:
            return state;
    }
}
