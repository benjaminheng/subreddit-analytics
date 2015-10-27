import { ADD_PERIOD } from "../actions";
import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default function periods(state = initialState, action) {
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
