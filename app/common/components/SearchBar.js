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
                <div className='search-wrapper'>
                    <input type='text' name='search' placeholder='Search users' className='search-input' ref='searchinput' />
                    <button className='search-button' onClick={e => this.handleSearch(e)}>
                        <svg className='search-button-icon' xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 96 96"><path d="M90.83 85.172l-22.702-22.7C73.055 56.31 76 48.5 76 40 76 20.118 59.883 4 40 4 20.118 4 4 20.118 4 40s16.118 36 36 36c8.5 0 16.312-2.946 22.47-7.873l22.702 22.7C85.952 91.61 86.977 92 88 92c1.024 0 2.048-.39 2.83-1.172 1.56-1.56 1.56-4.095 0-5.656zM40 68c-15.464 0-28-12.536-28-28s12.536-28 28-28c15.465 0 28 12.536 28 28S55.465 68 40 68z"/></svg>
                    </button>
                </div>
            </form>
        );
    }
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
}
