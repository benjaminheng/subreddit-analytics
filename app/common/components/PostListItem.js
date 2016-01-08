import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class PostListItem extends Component {
    render() {
        const { post } = this.props;

        return (
            <div>
                <div>{post.get('gilded')}</div>
                <div>
                    <span><Link to={post.get('permalink')}>{post.get('type')}</Link> by </span>
                    <Link to={'/user/' + post.get('author')}>{post.get('author')}</Link>
                </div>
            </div>
        );
    }
}

PostListItem.propTypes = {
    post: PropTypes.object.isRequired
}
