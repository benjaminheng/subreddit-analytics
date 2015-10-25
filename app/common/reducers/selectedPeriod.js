import { SELECT_PERIOD } from "../actions";

export default function selectedPeriod(state, action) {
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
