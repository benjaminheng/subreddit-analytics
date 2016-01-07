import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router'
import selectedPeriod from './selectedPeriod';
import periods from './periods';
import statsByPeriod from './statsByPeriod';
import globalStats from './globalStats';

const rootReducer = combineReducers({
    selectedPeriod,
    statsByPeriod,
    periods,
    globalStats,
    routing
});

export default rootReducer;
