import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    earliestDate: 'earliest-date',
    totalSubmissions: 0,
    totalComments: 0,
    totalVotes: 0
});

export default function globalStats(state = initialState, action) {
    // TODO: UPDATE_GLOBAL_STATS
    return state;
}
