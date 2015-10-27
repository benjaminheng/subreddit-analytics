import Immutable from 'immutable';
import { expect } from 'chai';
import { selectPeriod, addPeriod } from '../app/common/actions';
import { SELECT_PERIOD, ADD_PERIOD } from '../app/common/actions';

describe('actions', () => {
    it('creates an action to select a period', () => {
        const action = selectPeriod('1 week');
        expect(action).to.deep.equal({
            type: SELECT_PERIOD,
            period: '1 week'
        });
    });

    it('creates an action to add a period', () => {
        const action = addPeriod('1 week', 128, 256);
        expect(action).to.deep.equal({
            type: ADD_PERIOD,
            period: '1 week',
            start: 128,
            end: 256
        });
    });
});
