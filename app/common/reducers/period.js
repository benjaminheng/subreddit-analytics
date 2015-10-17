import { SELECT_PERIOD, REQUEST_PERIOD } from "../actions";

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

export function periods(state, action) {
    if (typeof state === 'undefined') {
        return {};
    }

    switch (action.type) {
        case REQUEST_PERIOD:    // load period stats from database
            return state;
        default:
            return state;
    }
}