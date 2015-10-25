import { ADD_PERIOD } from "../actions";
import Immutable from 'immutable';

export default function periods(state, action) {
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
