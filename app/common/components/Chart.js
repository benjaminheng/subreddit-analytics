import React, { Component, PropTypes } from 'react';
import Highcharts from 'highcharts';
import { is, fromJS } from 'immutable';

export default class Chart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.renderChart(this.props.config);
    }

    componentWillUpdate(nextProps) {
        // There is a bug that causes multiple redraws to speed up the draw
        // animation during the initial page load. The following `props.config`
        // comparison is a hack to work around it. We need to remove the _colorIndex
        // property injected by the Highcharts render, then use the Immutable 
        // class as a convenient way to perform a deep comparison.
        delete this.props.config.series[0]._colorIndex;
        if (!is(fromJS(this.props.config), fromJS(nextProps.config))) {
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
