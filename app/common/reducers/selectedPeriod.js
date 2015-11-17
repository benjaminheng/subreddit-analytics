import { SELECT_PERIOD } from "../actions";

const initialState = 'default';

export default function selectedPeriod(state = initialState, action) {
    switch (action.type) {
        case SELECT_PERIOD:     // change selected period
            return action.period;
        default:
            return state;
    }
}
