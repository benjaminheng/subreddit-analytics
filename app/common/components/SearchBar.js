import React, { Component, PropTypes } from 'react';

export default class SearchBar extends Component {
    render() {
        const { onSearch } = this.props;

        return (
            <div className='search-wrapper'>
                <input type='text' placeholder='Username' className='search-bar' ref='searchbar' />
                <button className='search-button' onClick={e => onSearch(this.refs.searchbar)}>Search</button>
            </div>
        );
    }
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
}
