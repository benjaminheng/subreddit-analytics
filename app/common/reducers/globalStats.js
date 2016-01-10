import Immutable from 'immutable';
import { RECEIVE_GLOBAL_STATS } from '../actions';

const initialState = Immutable.fromJS({
    earliestDate: 0,
    latestDate: 0,
    submissions: 0,
    comments: 0
});

export default function globalStats(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_GLOBAL_STATS:
            return state.merge(action.stats);
        default:
            return state;
    }
}
