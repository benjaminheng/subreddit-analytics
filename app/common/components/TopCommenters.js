import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import Chart from '../components/Chart';
import chartConfig from '../utils/chartConfig';

export default class TopCommenters extends Component {
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.state = {
            config: chartConfig.topCommentersByScore(data.get('score', List()))
        }
    }

    // selects the 'score' radio button and sets the data to 'by score'
    resetState(data) {
        this.setState({config: chartConfig.topCommentersByScore(data.get('score', List())) });
        this.refs.score.checked = true;
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
                this.setState({config: chartConfig.topCommentersByScore(data.get('score', List())) });
                break;
            case 'posts':
                this.setState({config: chartConfig.topCommentersByPosts(data.get('posts', List())) });
                break;
            default:
                return;
        }
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                <label>
                    <input ref='score' type='radio' name='order' onChange={e => this.onSelect('score')} defaultChecked></input> 
                    By karma
                </label>
                <label>
                    <input ref='posts' type='radio' name='order' onChange={e => this.onSelect('posts')}></input> 
                    By posts
                </label>
                <Chart config={this.state.config} />
            </div>
        );
    }
}

TopCommenters.propTypes = {
    data: PropTypes.object.isRequired,
}
