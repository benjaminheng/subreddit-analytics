import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class PostList extends Component {
    render() {
        const { posts, columns } = this.props;
        const showScore = columns.indexOf('score') != -1;
        const showGilded= columns.indexOf('gilded') != -1;
        const showAuthor = columns.indexOf('author') != -1;
        const showType = columns.indexOf('type') != -1;

        return (
            <table className='default-table'>
                <thead>
                    <tr>
                        {showGilded &&
                            <th>Gilded</th>
                        }
                        {showScore &&
                            <th>Karma</th>
                        }
                        {showAuthor &&
                            <th>Author</th>
                        }
                        {showType &&
                            <th>Type</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post =>
                        <tr key={post.get('id')}>
                            {showGilded &&
                                <td>{post.get('gilded')}</td>
                            }
                            {showScore &&
                                <td>{post.get('score')}</td>
                            }
                            {showAuthor &&
                                <td>
                                    <Link to={'/user/' + post.get('author')}>{post.get('author')}</Link>
                                </td>
                            }
                            {showType &&
                                <td>
                                    <span><a href={post.get('permalink')}>{post.get('type')}</a></span>
                                </td>
                            }
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.object.isRequired, // Immutable List
    columns: PropTypes.array
}

PostList.defaultProps = {
    columns: ['gilded', 'score', 'author', 'type']
}
