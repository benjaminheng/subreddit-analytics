import { SELECT_PERIOD, REQUEST_STATS, RECEIVE_STATS } from "../actions";

export function selectedPeriod(state, action) {
    if (typeof state === 'undefined') {
        return '1 week';
    }

    switch (action.type) {
        case SELECT_PERIOD:     // change selected period
            return action.name;
        default:
            return state;
    }
}

function period(state, action) {
    if (typeof state === 'undefined') {
        return {
            isFetching: false
        };
    }

    switch (action.type) {
        case REQUEST_STATS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_STATS:
            return Object.assign({}, state, {
                isFetching: false,
                lastUpdated: action.receivedAt,
                totals: action.stats.totals
            });
        default:
            return state;
    }
}

export function periods(state, action) {
    if (typeof state === 'undefined') {
        return {};
    }

    switch (action.type) {
        case RECEIVE_STATS:
        case REQUEST_STATS:    // load period stats from database
            return Object.assign({}, state, {
                [action.name]: period(state[action.name], action)
            });
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