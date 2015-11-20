import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { selectPeriod, addPeriod, fetchGlobalStats, fetchStatsIfNeeded } from '../actions';
import Header from '../components/Header'
import PeriodSelector from '../components/PeriodSelector'
import Counters from '../components/Counters'
import Footer from '../components/Footer'
import date from '../utils/date';
import defaultPeriods from '../utils/defaultPeriods';

class App extends Component {
    constructor(props) {
        super(props);
        this.onPeriodSelect = this.onPeriodSelect.bind(this);
    }

    initializeDefaultPeriod() {
        const { dispatch } = this.props;
        const period = '1 week';
        dispatch(addPeriod(period, defaultPeriods[period].start, defaultPeriods[period].end));
        dispatch(selectPeriod(period));
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchGlobalStats());
        this.initializeDefaultPeriod();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedPeriod !== this.props.selectedPeriod) {
            const { dispatch, selectedPeriod } = nextProps;
            dispatch(fetchStatsIfNeeded(selectedPeriod));
        }
    }

    onPeriodSelect(period, start, end) {
        const { dispatch } = this.props;
        dispatch(addPeriod(period, start, end));
        dispatch(selectPeriod(period));
    }

    render() {
        const { selectedPeriod, globalStats, stats} = this.props;
        return (
            <div>
                <Header />
                <PeriodSelector selectedPeriod={selectedPeriod} onPeriodSelect={this.onPeriodSelect} />
                <Counters items={stats.get('totals')} />
                <Footer globalStats={globalStats} />
            </div>
        );
    }
}

function select(state) {
    const { selectedPeriod, periods, statsByPeriod, globalStats } = state;
    const stats = statsByPeriod.getIn([selectedPeriod, 'stats'], fromJS({
        totals: {}
    }))
    return {
        selectedPeriod, stats, globalStats
    };
}

export default connect(select)(App);
