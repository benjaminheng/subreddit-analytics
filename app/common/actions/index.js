import fetch from 'isomorphic-fetch';

export const SELECT_PERIOD = 'SELECT_PERIOD';
export const REQUEST_STATS = 'REQUEST_STATS';
export const RECEIVE_STATS = 'RECEIVE_STATS';

export function selectPeriod(name) {
    return {
        type: SELECT_PERIOD,
        name
    };
}

function requestStats(name) {
    return {
        type: REQUEST_STATS,
        name
    };
}

function receiveStats(name, json) {
    return {
        type: RECEIVE_STATS,
        name,
        stats: json,
        receivedAt: Date.now()
    };
}

export function fetchStats(name, start, end) {
    return dispatch => {
        dispatch(requestStats(name));

        fetch(`/api/periodStats?start=${start}&end=${end}`, {
        }).then(response => response.json())
            .then(json => dispatch(receiveStats(name, json)));

        // catch error here?
    }
}