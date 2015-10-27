import fetch from 'isomorphic-fetch';

export const SELECT_PERIOD = 'SELECT_PERIOD';
export const ADD_PERIOD = 'ADD_PERIOD';
export const REQUEST_STATS = 'REQUEST_STATS';
export const RECEIVE_STATS = 'RECEIVE_STATS';

export function selectPeriod(period){
    return {
        type: SELECT_PERIOD,
        period
    };
}

export function addPeriod(period, start, end) {
    return {
        type: ADD_PERIOD,
        period,
        start,
        end
    }
}

function requestStats(period) {
    return {
        type: REQUEST_STATS,
        period
    };
}

function receiveStats(period, json) {
    return {
        type: RECEIVE_STATS,
        period,
        stats: json,
        receivedAt: Date.now()
    };
}

function shouldFetchStats(state, period) {
    const periodStats = state.statsByPeriod.get(period);
    if (!periodStats) {
        return true;
    } else if (periodStats.get('isFetching')) {
        return false
    }
    return true;
}

function fetchStats(period) {
    return (dispatch, getState) => {
        const interval = {
            start: getState().periods.get(period).get('start'),
            end: getState().periods.get(period).get('end')
        }
        dispatch(requestStats(period));
        // TODO: this is placeholder data
        dispatch(receiveStats(period, {
            totals: {
                submissions: 10,
                comments: 15,
                uniqueCommenters: 20
            }
        }));

        //fetch(`/api/totalStats?start=${start}&end=${end}`)
            //.then(response => response.json())
            //.then(json => dispatch(receiveStats(period, json)));

        // catch error here?
    }
}

export function fetchStatsIfNeeded(period) {
    return (dispatch, getState) => {
        if (shouldFetchStats(getState(), period)) {
            return dispatch(fetchStats(period));
        }
    };
}
