import { combineReducers } from 'redux';
import { selectedPeriod, statsByPeriod, periods, earliestDate } from './period'

const rootReducer = combineReducers({
    selectedPeriod,
    statsByPeriod,
    periods,
    earliestDate
});

export default rootReducer;
