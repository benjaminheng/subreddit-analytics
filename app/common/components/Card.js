import React, { Component, PropTypes } from 'react';

export default class Card extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = 'card';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return (
            <div className={className}>
                {this.props.title &&
                    <h2>{this.props.title}</h2>
                }
                {this.props.children}
            </div>
        );
    }
}

Card.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string
}
