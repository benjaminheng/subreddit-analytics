import date from '../utils/date';

const defaultPeriods = {
    '1 day': {
        start: date.minus(date.now(), 1, 'days'),
        end: date.now()
    },
    '1 week': {
        start: date.minus(date.now(), 7, 'days'),
        end: date.now()
    },
    '1 month': {
        start: date.minus(date.now(), 30, 'days'),
        end: date.now()
    },
    '1 year': {
        start: date.minus(date.now(), 365, 'days'),
        end: date.now()
    }
}

export default defaultPeriods;
