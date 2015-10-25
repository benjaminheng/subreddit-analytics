import { SELECT_PERIOD, ADD_PERIOD, REQUEST_STATS, RECEIVE_STATS } from "../actions";
import Immutable from 'immutable';

export function selectedPeriod(state, action) {
    if (typeof state === 'undefined') {
        return '1 week';
    }

    switch (action.type) {
        case SELECT_PERIOD:     // change selected period
            return action.period;
        default:
            return state;
    }
}

export function periods(state, action) {
    if (typeof state === 'undefined') {
        return Immutable.fromJS({});
    }

    switch (action.type) {
        case ADD_PERIOD:
            return state.set(action.period, Immutable.fromJS({
                start: action.start,
                end: action.end
            }));
        default:
            return state;
    }
}

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

export function statsByPeriod(state, action) {
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

export function earliestDate(state, action) {
    if (typeof state === 'undefined') {
        return 'unable to retrieve';
    }
    return state;
}
