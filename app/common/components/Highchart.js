import React, { Component, PropTypes } from 'react';

if (typeof window !== 'undefined') {
    global.HighchartsAdapter = require('highcharts-release/adapters/standalone-framework');
    console.log(global.HighchartsAdapter);
    var Highcharts = require('highcharts-release/highcharts');
    console.log(Highcharts);
}

export default class Highchart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.renderChart();
    }

    renderChart() {
        if (typeof window !== 'undefined') {
            // hack to only include highcharts when not rendering on server
            const config = this.props.config;
            const chartConfig = config.chart;
            this.chart = new Highcharts['Chart']({
                ...config,
                chart: {
                    type: 'bar',
                    renderTo: this.refs.chart
                }
            });
            console.log(this.chart);
        }
    }

    render() {
        const props = {
            ...this.props,
            'ref': 'chart'
        };

        return (
            <div {...props} />
        );
    }
}

Highchart.propTypes = {
    config: PropTypes.object.isRequired
}
