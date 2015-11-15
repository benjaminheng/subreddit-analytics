import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPeriod, addPeriod, fetchGlobalStats, fetchStatsIfNeeded } from '../actions';
import Header from '../components/Header'
import PeriodSelector from '../components/PeriodSelector'
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
        dispatch(selectPeriod(period));
        dispatch(addPeriod(period, defaultPeriods[period].start, defaultPeriods[period].end));
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

    onPeriodSelect(period, start, end) {
        const { dispatch } = this.props;
        dispatch(selectPeriod(period));
        dispatch(addPeriod(period, start, end));
    }

    render() {
        const { selectedPeriod, globalStats } = this.props;
        return (
            <div>
                <Header />
                <PeriodSelector selectedPeriod={selectedPeriod} onPeriodSelect={this.onPeriodSelect} />
                <Footer globalStats={globalStats} />
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
