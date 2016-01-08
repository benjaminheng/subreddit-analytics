import React, { Component, PropTypes } from 'react';
import PostListItem from './PostListItem';

export default class PostList extends Component {
    render() {
        const { posts } = this.props;

        return (
            <div>
                {posts.map(post =>
                    <PostListItem post={post} />
                )}
            </div>
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.object.isRequired // Immutable List
}
