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
            this.chart.xAxis[0].update(nextProps.config.xAxis, false);
            this.chart.yAxis[0].update(nextProps.config.yAxis, false);
            this.chart.series[0].setData(nextProps.config.series[0].data, false);
            this.chart.setTitle(nextProps.config.title, nextProps.config.subtitle, false);
            this.chart.redraw();
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
