import React, { Component, PropTypes } from 'react';
import Counter from '../components/Counter'
import Card from '../components/Card'

export default class Counters extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { items } = this.props;
        return (
            <Card className='counters'>
                {items.keySeq().map(key => 
                    <Counter key={key} name={key} count={items.get(key)} />
                )}
            </Card>
        );
    }
}
