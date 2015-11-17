import { combineReducers } from 'redux';
import selectedPeriod from './selectedPeriod';
import periods from './periods';
import statsByPeriod from './statsByPeriod';
import globalStats from './globalStats';
import displayedStats from './displayedStats';

const rootReducer = combineReducers({
    selectedPeriod,
    statsByPeriod,
    periods,
    globalStats,
    displayedStats
});

export default rootReducer;
