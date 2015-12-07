import React, { Component, PropTypes } from 'react';

if (typeof window !== 'undefined') {
    // Use exports-loader to get the HighchartsAdapter variable out of the 
    // package since it doesn't export the variable as per CommonJS convention
    global.HighchartsAdapter = require('exports?HighchartsAdapter!highcharts-release/adapters/standalone-framework.js');
    require('highcharts-release/highcharts.js');
}

export default class Chart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.renderChart(this.props.config);
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.config !== nextProps.config) {
            this.renderChart(nextProps.config);
        }
        return true;
    }

    renderChart(config) {
        if (typeof window !== 'undefined') {
            const chartConfig = config.chart;
            this.chart = new Highcharts['Chart']({
                ...config,
                chart: {
                    ...chartConfig,
                    renderTo: this.refs.chart
                }
            });
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

Chart.propTypes = {
    config: PropTypes.object.isRequired
}
