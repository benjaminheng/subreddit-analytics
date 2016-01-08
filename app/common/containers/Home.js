import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS, List, Map } from 'immutable';
import { selectPeriod, addPeriod, fetchStatsIfNeeded } from '../actions';
import Header from '../components/Header'
import PeriodSelector from '../components/PeriodSelector'
import Counters from '../components/Counters'
import Footer from '../components/Footer'
import TopCommenters from '../components/TopCommenters'
import defaultPeriods from '../utils/defaultPeriods';
import Chart from '../components/Chart';
import chartConfig from '../utils/chartConfig';

class Home extends Component {
    constructor(props) {
        super(props);
        this.onPeriodSelect = this.onPeriodSelect.bind(this);
    }

    initializeDefaultPeriod() {
        const { dispatch } = this.props;
        const period = '1 week';
        dispatch(addPeriod(period, defaultPeriods[period].start, defaultPeriods[period].end));
        dispatch(selectPeriod(period));
    }

    componentDidMount() {
        this.initializeDefaultPeriod();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedPeriod !== this.props.selectedPeriod) {
            const { dispatch, selectedPeriod } = nextProps;
            dispatch(fetchStatsIfNeeded(selectedPeriod));
        }
    }

    onPeriodSelect(period, start, end) {
        const { dispatch } = this.props;
        dispatch(addPeriod(period, start, end));
        dispatch(selectPeriod(period));
    }

    render() {
        const { selectedPeriod, periodRange, stats, isFetching } = this.props;

        const distributionDayConfig = chartConfig.commentDistributionByDay(stats.getIn(['distribution', 'dayOfWeek'], List()));
        const distributionHourConfig = chartConfig.commentDistributionByHour(stats.getIn(['distribution', 'hour'], List()));
        const commentsPerMonthConfig = chartConfig.commentsPerMonth(stats.get('commentsPerMonth', List()));

        return (
            <div>
                <PeriodSelector selectedPeriod={selectedPeriod} onPeriodSelect={this.onPeriodSelect} />

                {isFetching && 
                    <div>Loading...</div>
                }
                {!isFetching && 
                    <div>
                        <Counters items={stats.get('totals')} />
                        <TopCommenters data={stats.get('topCommenters', Map())} />
                        {periodRange >= 604800 &&   // >= 7 days
                            <Chart config={distributionDayConfig} />
                        }
                        <Chart config={distributionHourConfig} />
                        {selectedPeriod === 'all time' &&
                            <Chart config={commentsPerMonthConfig} />
                        }
                    </div>
                }
            </div>
        );
    }
}

function select(state) {
    const { selectedPeriod, periods, statsByPeriod } = state;

    const isFetching = statsByPeriod.getIn([selectedPeriod, 'isFetching']);
    const stats = statsByPeriod.getIn([selectedPeriod, 'stats'], fromJS({
        totals: {}
    }))
    const periodRange = periods.getIn([selectedPeriod, 'end']) - periods.getIn([selectedPeriod, 'start']);

    return {
        selectedPeriod, periodRange, stats, isFetching
    };
}

export default connect(select)(Home);
