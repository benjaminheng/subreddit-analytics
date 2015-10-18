import { combineReducers } from 'redux';
import { selectedPeriod, periods, earliestDate } from './period'

const rootReducer = combineReducers({
    selectedPeriod,
    periods,
    earliestDate
});

export default rootReducer;