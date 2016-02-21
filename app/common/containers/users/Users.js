import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../components/SearchBar';

class Users extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(searchbar) {
        const { dispatch } = this.props;
        const { router } = this.context;
        const username = searchbar.value;
        if (username !== '') {
            router.push('/user/' + username);
            searchbar.value = '';
        }
    }

    render() {
        return (
            <div>
                <SearchBar onSearch={this.handleSearch} />
                {this.props.children}
            </div>
        );
    }
}

Users.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function select(state) {
    return state;
}
export default connect(select)(Users);
