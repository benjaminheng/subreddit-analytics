import { combineReducers } from 'redux';
import { selectedPeriod, periods } from './period'

const rootReducer = combineReducers({
    selectedPeriod,
    periods
});

export default rootReducer;