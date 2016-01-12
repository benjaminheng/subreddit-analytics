import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';
import SearchBar from '../../components/SearchBar';

class Users extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(searchbar) {
        const { dispatch } = this.props;
        const username = searchbar.value;
        if (username !== '') {
            dispatch(pushPath('/user/' + username));
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

function select(state) {
    return state;
}
export default connect(select)(Users);
