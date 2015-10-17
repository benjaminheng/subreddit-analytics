export const SELECT_PERIOD = 'SELECT_PERIOD';
export const REQUEST_PERIOD = 'REQUEST_PERIOD';

export function selectPeriod(name) {
    return { type: SELECT_PERIOD, name }
}

export function requestPeriod(name) {
    return { type: REQUEST_PERIOD, name }
}