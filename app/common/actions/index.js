import fetch from 'isomorphic-fetch';
import date from '../utils/date';

export const SELECT_PERIOD = 'SELECT_PERIOD';
export const ADD_PERIOD = 'ADD_PERIOD';
export const REQUEST_STATS = 'REQUEST_STATS';
export const RECEIVE_STATS = 'RECEIVE_STATS';
export const RECEIVE_GLOBAL_STATS = 'RECEIVE_GLOBAL_STATS';
export const REQUEST_USER_STATS = 'REQUEST_USER_STATS';
export const RECEIVE_USER_STATS = 'RECEIVE_USER_STATS';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';

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

function receiveGlobalStats(json) {
    return {
        type: RECEIVE_GLOBAL_STATS,
        stats: json
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
        receivedAt: date.now()
    };
}

function requestUserStats(username) {
    return {
        type: REQUEST_USER_STATS,
        username
    };
}

function receiveUserStats(username, json) {
    return {
        type: RECEIVE_USER_STATS,
        username,
        stats: json,
        receivedAt: date.now()
    };
}

function receiveUserInfo(username, json) {
    return {
        type: RECEIVE_USER_INFO,
        username,
        info: json,
        receivedAt: date.now()
    };
}

function shouldFetchStats(state, period) {
    const periodStats = state.statsByPeriod.get(period);
    if (!periodStats) {
        return true;
    } else if (periodStats.get('isFetching')) {
        return false
    } else if (date.now() - periodStats.get('lastUpdated') < 360) {
        // last updated less than 5 minutes ago
        return false
    }
    return true;
}

function fetchStats(period) {
    return (dispatch, getState) => {
        const start = getState().periods.get(period).get('start');
        const end = getState().periods.get(period).get('end');
        dispatch(requestStats(period));
        fetch(`/api/stats?start=${start}&end=${end}`)
            .then(response => response.json())
            .then(json => dispatch(receiveStats(period, json)));

        // TODO: catch error here
    }
}

export function fetchStatsIfNeeded(period) {
    return (dispatch, getState) => {
        if (shouldFetchStats(getState(), period)) {
            return dispatch(fetchStats(period));
        }
    };
}

export function fetchUserStats(username) {
    return (dispatch, getState) => {
        dispatch(requestUserStats(username));
        fetch(`/api/userStats?username=${username}`)
            .then(response => response.json())
            .then(json => dispatch(receiveUserStats(username, json)));
        // TODO: catch error here
    }
}

export function fetchUserInfo(username) {
    return (dispatch, getState) => {
        fetch(`/api/userInfo?username=${username}`)
            .then(response => response.json())
            .then(json => dispatch(receiveUserInfo(username, json)));
        // TODO: catch error here
    }
}

export function fetchGlobalStats() {
    return (dispatch) => {
        fetch(`/api/globalStats`)
            .then(response => response.json())
            .then(json => dispatch(receiveGlobalStats(json)));
    }
}
