import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStats } from '../actions';
import Header from '../components/Header'
import Footer from '../components/Footer'

class App extends Component {
    componentDidMount() {
        const { dispatch, selectedPeriod } = this.props;
        dispatch(fetchStats(selectedPeriod, 'start', 'end'));
    }

    render() {
        const earliestDate = 'yesterday';
        const {dispatch, selectedPeriod, periods } = this.props;

        return (
            <div>
                <Header />
                <p>Test string</p>
                <a href='#' >
                    Refresh
                </a>
                <Footer totals = {periods['All time'].totals}
                        earliestDate = {earliestDate} />
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);