import { combineReducers } from 'redux';
import selectedPeriod from './selectedPeriod';
import periods from './periods';
import statsByPeriod from './statsByPeriod';
import statsByUser from './statsByUser';
import globalStats from './globalStats';

const rootReducer = combineReducers({
    selectedPeriod,
    statsByPeriod,
    statsByUser,
    periods,
    globalStats
});

export default rootReducer;
