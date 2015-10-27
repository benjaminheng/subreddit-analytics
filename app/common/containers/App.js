import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPeriod, addPeriod, fetchStatsIfNeeded } from '../actions';
import Header from '../components/Header'
import PeriodSelector from '../components/PeriodSelector'
import Footer from '../components/Footer'

class App extends Component {
    constructor(props) {
        super(props);
        this.onPeriodSelect = this.onPeriodSelect.bind(this);
        this.defaultPeriod = {
            period: '1 week',
            start: 32,
            end: 64
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(selectPeriod(this.defaultPeriod.period));
        dispatch(addPeriod(this.defaultPeriod.period, this.defaultPeriod.start, this.defaultPeriod.end));
        dispatch(fetchStatsIfNeeded(this.defaultPeriod.period));
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
        const { selectedPeriod } = this.props;
        return (
            <div>
                <Header />
                <PeriodSelector selectedPeriod={selectedPeriod} onPeriodSelect={this.onPeriodSelect} />
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
