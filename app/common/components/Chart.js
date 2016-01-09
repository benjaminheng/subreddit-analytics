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
        // Convenient way to deep compare two objects
        if (!is(fromJS(this.props.config), fromJS(nextProps.config))) {
            if (this.props.softUpdate) {
                this.chart.xAxis[0].update(nextProps.config.xAxis, false);
                this.chart.yAxis[0].update(nextProps.config.yAxis, false);
                this.chart.series[0].setData(nextProps.config.series[0].data, false);
                this.chart.redraw();
            } else {
                this.renderChart(nextProps.config);
            }
        }
    }

    renderChart(config) {
        // Convenient way to deep clone an object.
        const clone = fromJS(config).toJS();
        this.chart = new Highcharts['Chart']({
            ...clone,
            chart: {
                ...clone.chart,
                renderTo: this.refs.chart
            }
        });
    }

    render() {
        let className = 'chart';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        const props = {
            ...this.props,
            className: className,
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
