import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        dispatch(fetchStatsIfNeeded(period));
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

    shouldComponentUpdate(nextProps, nextState) {
        const { selectedPeriod, statsByPeriod } = nextProps;
        if (typeof statsByPeriod.getIn([selectedPeriod, 'stats']) === 'undefined') {
            return false;
        }
        return true;
    }

    onPeriodSelect(period, start, end) {
        const { dispatch } = this.props;
        dispatch(addPeriod(period, start, end));
        dispatch(selectPeriod(period));
    }

    render() {
        const { selectedPeriod, globalStats, statsByPeriod } = this.props;
        const stats = statsByPeriod.getIn([selectedPeriod, 'stats']);
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
    return state;
}

export default connect(select)(App);
