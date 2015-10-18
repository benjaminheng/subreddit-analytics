import { SELECT_PERIOD, ADD_PERIOD, REQUEST_STATS, RECEIVE_STATS } from "../actions";

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
        return {}
    }

    switch (action.type) {
        case ADD_PERIOD:
            return Object.assign({}, state, {
                [action.period]: {
                    start: action.start,
                    end: action.end
                }
            });
        default:
            return state;
    }
}

function stats(state, action) {
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

export function statsByPeriod(state, action) {
    if (typeof state === 'undefined') {
        return {};
    }

    switch (action.type) {
        case RECEIVE_STATS:
        case REQUEST_STATS:    // load period stats from database
            return Object.assign({}, state, {
                [action.period]: stats(state[action.period], action)
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