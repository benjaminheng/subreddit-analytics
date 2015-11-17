import { RECEIVE_STATS } from "../actions";
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    totals: {}
});

export default function displayedStats(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_STATS:
            return state.merge(action.stats);
        default:
            return state;
    }
}
