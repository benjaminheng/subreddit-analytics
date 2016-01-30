import React, { Component, PropTypes } from 'react';

export default class SearchBar extends Component {

    handleSearch(e) {
        const { onSearch } = this.props;
        e.preventDefault();
        onSearch(this.refs.searchinput);
    }

    render() {
        const { onSearch } = this.props;

        return (
            <form onSubmit={e => this.handleSearch(e)} className='search-bar'>
                <input type='text' name='search' placeholder='Search users' className='search-input' ref='searchinput' />
                <button className='search-button' onClick={e => this.handleSearch(e)}>Search</button>
            </form>
        );
    }
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
}
