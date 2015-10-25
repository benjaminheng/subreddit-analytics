import { combineReducers } from 'redux';
import selectedPeriod from './selectedPeriod';
import periods from './periods';
import statsByPeriod from './statsByPeriod';
import globalStats from './globalStats';

const rootReducer = combineReducers({
    selectedPeriod,
    statsByPeriod,
    periods,
    globalStats
});

export default rootReducer;
