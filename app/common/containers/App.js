import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'

export default class App extends Component {
    render() {
        // TODO: Temporary
        const totals = {
            submissions: 10,
            comments: 15
        };
        const dateSince = 'yesterday';

        return (
            <div>
                <Header />
                <p>Test string</p>
                <Footer totals = {totals}
                        dateSince = {dateSince} />
            </div>
        );
    }
}