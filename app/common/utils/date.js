import dateformat from 'dateformat';

function pretty(seconds, time=false) {
    if (time) {
        return dateformat(toDate(seconds), 'dd-mm-yyyy hh:MMTT');
    }
    return dateformat(toDate(seconds), 'dd-mm-yyyy');
}

function toSeconds(date) {
    return Math.ceil(date.getTime() / 1000);
}

function toDate(seconds) {
    return new Date(seconds*1000);
}

function now() {
    return toSeconds(new Date);
}

function minus(seconds, number, unit) {
    switch (unit) {
        case 'days':
            return minusDays(seconds, number);
        default:
            return seconds;
    }
}

function minusDays(seconds, number) {
    var date = toDate(seconds);
    var newDate = date;
    newDate.setDate(date.getDate() - number);
    return toSeconds(newDate);
}

export default { 
    pretty,
    toSeconds,
    toDate,
    now,
    minus
};
