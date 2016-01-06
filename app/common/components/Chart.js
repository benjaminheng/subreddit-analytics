import React, { Component, PropTypes } from 'react';
import Highcharts from 'highcharts';

export default class Chart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.renderChart(this.props.config);
    }

    componentWillUpdate(nextProps) {
        if (this.props.softUpdate) {
            this.chart.series[0].setData(nextProps.config.series[0].data);
            this.chart.axes[0].update(nextProps.config.xAxis);
            this.chart.axes[1].update(nextProps.config.yAxis);
            this.chart.setTitle(nextProps.config.title);
        } else {
            this.renderChart(nextProps.config);
        }
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
    config: PropTypes.object.isRequired,
    softUpdate: PropTypes.bool
}

Chart.defaultProps = {
    softUpdate: true
}
