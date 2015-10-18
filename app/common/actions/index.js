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

export function fetchStats(period, start, end) {
    return dispatch => {
        dispatch(addPeriod(period, start, end));
        dispatch(requestStats(period));

        fetch(`/api/periodStats?start=${start}&end=${end}`, {
        }).then(response => response.json())
            .then(json => dispatch(receiveStats(period, json)));

        // catch error here?
    }
}