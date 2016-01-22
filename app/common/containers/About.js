import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../components/Card';

class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className='about-page'>
                <h2>About</h2>
                <p>
                    Subreddit Analytics lets you visualize data within the <a href='https://www.reddit.com/r/singapore/'>/r/Singapore</a> subreddit and its users. Activity information about the community, as well as individual users, is available in an easy to digest manner. It also provides visualizations to recognize well contributing members of the community.
                </p>
                <p>
                    The source code for Subreddit Analytics is freely <a href='https://github.com/benjaminheng/subreddit-analytics'>available on GitHub</a>.
                </p>

                <h2>Technology Stack</h2>
                <ul>
                    <li>
                        <a href='https://nodejs.org/'><strong>Node.js</strong></a> provides the <strong>JavaScript runtime</strong> used by the application
                    </li>
                    <li>
                        <a href='http://expressjs.com/'><strong>Express</strong></a> is the <strong>web application framework</strong> that runs on the server
                    </li>
                    <li>
                        <a href='https://facebook.github.io/react/'><strong>React</strong></a> is the <strong>front-end library</strong> used to render the user interface
                    </li>
                    <li>
                        <a href='https://github.com/rackt/redux'><strong>Redux</strong></a> <strong>manages the state</strong> of the application between user actions
                    </li>
                    <li>
                        <a href='http://www.postgresql.org/'><strong>PostgreSQL</strong></a> is the <strong>database</strong> that powers it all
                    </li>
                    <li>
                        <a href='http://www.highcharts.com/'><strong>Highcharts</strong></a> is the <strong>charting library</strong> used
                    </li>
                </ul>
            </Card>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(About);
