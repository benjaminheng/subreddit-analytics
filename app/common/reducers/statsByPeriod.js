import { REQUEST_STATS, RECEIVE_STATS } from "../actions";
import Immutable from 'immutable';

const initialState = Immutable.fromJS({});
const periodInitialState = Immutable.fromJS({
    isFetching: true,
    lastUpdated: 0,
    stats: {}
});

function stats(state = initialState, action) {
    switch (action.type) { 
        case RECEIVE_STATS:
            return state.merge({
                totals: action.stats.totals
            });
        default:
            return state;
    }
}

function period(state = periodInitialState, action) {
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

export default function statsByPeriod(state = initialState, action) {
    switch (action.type) {
        case REQUEST_STATS:
        case RECEIVE_STATS:
            return state.set(action.period, period(state.get(action.period), action));
        default:
            return state;
    }
}
