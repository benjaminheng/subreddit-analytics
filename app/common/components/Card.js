import React, { Component } from 'react';

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
                {this.props.children}
            </div>
        );
    }
}
