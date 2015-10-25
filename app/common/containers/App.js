import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStats } from '../actions';
import Header from '../components/Header'
import PeriodSelector from '../components/PeriodSelector'
import Footer from '../components/Footer'

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, selectedPeriod, periods } = this.props;
        dispatch(fetchStats(selectedPeriod, 'start', 'end'));
    }

    render() {
        const earliestDate = 'yesterday';
        const {dispatch, selectedPeriod, periods, statsByPeriod } = this.props;

        return (
            <div>
                <Header />
                <PeriodSelector />
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
