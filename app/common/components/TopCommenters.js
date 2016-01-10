import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import Chart from '../components/Chart';
import Card from '../components/Card';
import chartConfig from '../utils/chartConfig';

export default class TopCommenters extends Component {
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.titles = {
            score: 'Top commenters by karma',
            posts: 'Top commenters by posts'
        }
        this.state = {
            config: chartConfig.topCommentersByScore(data.get('score', List())),
            title: this.titles.score,
            selected: 'score'
        }
    }

    // selects the 'score' radio button and sets the data to 'by score'
    resetState(data) {
        this.setState({
            config: chartConfig.topCommentersByScore(data.get('score', List())),
            title: this.titles.score,
            selected: 'score'
        });
    }

    // resets the component when props change
    componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        this.resetState(data);
    }

    // Change the data displayed when user clicks on a radio button
    onSelect(order) {
        const { data } = this.props;
        switch(order) {
            case 'score':
                this.setState({
                    config: chartConfig.topCommentersByScore(data.get('score', List())),
                    title: this.titles.score,
                    selected: 'score'
                });
                break;
            case 'posts':
                this.setState({
                    config: chartConfig.topCommentersByPosts(data.get('posts', List())),
                    title: this.titles.posts,
                    selected: 'posts'
                });
                break;
            default:
                return;
        }
    }

    render() {
        const { data } = this.props;
        const { selected } = this.state;
        const scoreClass = 'default-button' + (selected === 'score' ? ' selected':'');
        const postsClass = 'default-button' + (selected === 'posts' ? ' selected':'');

        return (
            <Card>
                <h2>{this.state.title}</h2>
                <button className={scoreClass} ref='score' onClick={e => this.onSelect('score')}>Karma</button> 
                <button className={postsClass} ref='posts' onClick={e => this.onSelect('posts')}>Posts</button> 
                <Chart className='top-commenters-chart' config={this.state.config} />
            </Card>
        );
    }
}

TopCommenters.propTypes = {
    data: PropTypes.object.isRequired,
}
