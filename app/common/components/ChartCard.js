import React, { Component, PropTypes } from 'react';
import Card from './Card';
import Chart from './Chart';

export default class ChartCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, config } = this.props;
        return (
            <Card title={title}>
                <Chart config={config} />
            </Card>
        );
    }
}

ChartCard.propTypes = {
    title: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired
}
