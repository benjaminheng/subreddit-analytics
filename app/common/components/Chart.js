import React, { Component, PropTypes } from 'react';
import Highcharts from 'highcharts';

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
        const chartConfig = config.chart;
        this.chart = new Highcharts['Chart']({
            ...config,
            chart: {
                ...chartConfig,
                renderTo: this.refs.chart
            }
        });
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
