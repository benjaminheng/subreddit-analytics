import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS, List, Map } from 'immutable';
import { selectPeriod, addPeriod, fetchStatsIfNeeded } from '../actions';
import Header from '../components/Header';
import PeriodSelector from '../components/PeriodSelector';
import Counters from '../components/Counters';
import Footer from '../components/Footer';
import TopCommenters from '../components/TopCommenters';
import PostList from '../components/PostList';
import defaultPeriods from '../utils/defaultPeriods';
import Chart from '../components/Chart';
import ChartCard from '../components/ChartCard';
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

    getTitle() {
        const { selectedPeriod } = this.props;
        if (selectedPeriod === 'all time') {
            return <h1 className='title'><span className='highlight'>All time</span> stats</h1>;
        } else {
            return <h1 className='title'>Stats for the past <span className='highlight'>{selectedPeriod}</span></h1>;
        }
    }

    render() {
        const { selectedPeriod, periodRange, stats, isFetching } = this.props;

        const distributionDayConfig = chartConfig.commentDistributionByDay(stats.getIn(['distribution', 'dayOfWeek'], List()));
        const distributionHourConfig = chartConfig.commentDistributionByHour(stats.getIn(['distribution', 'hour'], List()));
        const commentsPerMonthConfig = chartConfig.commentsPerMonth(stats.get('commentsPerMonth', List()));

        return (
            <div className='home'>
                <PeriodSelector selectedPeriod={selectedPeriod} onPeriodSelect={this.onPeriodSelect} />

                {isFetching && 
                    <div>Loading...</div>
                }
                {!isFetching && !stats.isEmpty() && 
                    <div>
                        {this.getTitle()}
                        <Counters items={stats.get('totals', Map())} />
                        <TopCommenters data={stats.get('topCommenters', Map())} />
                        { /*<PostList posts={stats.getIn(['gilded', 'posts'], List())} />*/ }
                        {periodRange >= 604800 &&   // >= 7 days
                            <ChartCard title='Comment distribution by day of week' config={distributionDayConfig} />
                        }
                        <ChartCard title='Comment distribution by hour of day' config={distributionHourConfig} />
                        {selectedPeriod === 'all time' &&
                            <ChartCard title='Total comments per month' config={commentsPerMonthConfig} />
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
    const stats = statsByPeriod.getIn([selectedPeriod, 'stats'], Map());
    const periodRange = periods.getIn([selectedPeriod, 'end']) - periods.getIn([selectedPeriod, 'start']);

    return {
        selectedPeriod, periodRange, stats, isFetching
    };
}

export default connect(select)(Home);
