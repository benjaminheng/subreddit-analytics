import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import { fetchUserStats } from '../../actions';
import LoadingIndicator from '../../components/LoadingIndicator';
import Counters from '../../components/Counters';
import ChartCard from '../../components/ChartCard';
import chartConfig from '../../utils/chartConfig';

class UserIndex extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { statsByUser, dispatch } = this.props;
        const username = this.props.params.username.toLowerCase();
        if (!statsByUser.get(username)) {
            dispatch(fetchUserStats(username));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { statsByUser, dispatch } = this.props;
        const currentUsername = this.props.params.username.toLowerCase();
        const nextUsername = nextProps.params.username.toLowerCase();
        if (currentUsername !== nextUsername && !statsByUser.get(nextUsername)) {
            dispatch(fetchUserStats(nextUsername));
        }
    }

    render() {
        const { statsByUser } = this.props;
        const username = this.props.params.username;
        const usernameLowercase = username.toLowerCase();
        const stats = statsByUser.getIn([usernameLowercase, 'stats'], Map());
        const isFetching = statsByUser.getIn([usernameLowercase, 'isFetching'], false);

        const distributionDayConfig = chartConfig.commentDistributionByDay(stats.getIn(['distribution', 'dayOfWeek'], List()));
        const distributionHourConfig = chartConfig.commentDistributionByHour(stats.getIn(['distribution', 'hour'], List()));
        const commentsPerMonthConfig = chartConfig.commentsPerMonth(stats.get('commentsPerMonth', List()));

        return (
            <div>
                <h1 className='title'>Stats for <span className='highlight'>{username}</span></h1>
                {isFetching && 
                    <LoadingIndicator text='Fetching stats' />
                }

                {!isFetching && !stats.isEmpty() &&
                    <div>
                        <Counters items={stats.get('totals', Map())} />
                        <ChartCard title='Total comments per month' config={commentsPerMonthConfig} />
                        <ChartCard title='Comment distribution by day of week' config={distributionDayConfig} />
                        <ChartCard title='Comment distribution by hour of day' config={distributionHourConfig} />
                    </div>
                }
            </div>
        );
    }
}

function select(state) {
    return state;
}
export default connect(select)(UserIndex);
