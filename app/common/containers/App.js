import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGlobalStats } from '../actions';
import Header from '../components/Header'
import Footer from '../components/Footer'

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchGlobalStats());
    }

    render() {
        const { globalStats } = this.props;
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer globalStats={globalStats} />
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
