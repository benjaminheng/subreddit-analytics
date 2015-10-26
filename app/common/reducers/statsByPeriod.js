import { REQUEST_STATS, RECEIVE_STATS } from "../actions";
import Immutable from 'immutable';

function stats(state, action) {
    if (typeof state === 'undefined') {
        return Immutable.fromJS({});
    }

    switch (action.type) { 
        case RECEIVE_STATS:
            return state.merge({
                totals: action.stats.totals
            });
        default:
            return state;
    }
}

function period(state, action) {
    if (typeof state === 'undefined') {
        return Immutable.fromJS({
            isFetching: true,
            lastUpdated: 0,
            stats: {}
        });
    }
    switch (action.type) {
        case REQUEST_STATS:
            return state.set('isFetching', true);
        case RECEIVE_STATS:
            return state.merge({
                isFetching: false,
                lastUpdated: action.receivedAt,
                stats: stats(state.get('stats'), action)
            });
        default:
            return state;
    }
}

export default function statsByPeriod(state, action) {
    if (typeof state === 'undefined') {
        return Immutable.fromJS({});
    }

    switch (action.type) {
        case REQUEST_STATS:
        case RECEIVE_STATS:
            return state.set(action.period, period(state.get(action.period), action));
        default:
            return state;
    }
}
