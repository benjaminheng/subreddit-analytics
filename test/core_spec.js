import Immutable from 'immutable';
import { expect } from 'chai';
import { selectPeriod, addPeriod } from '../app/common/actions';
import selectedPeriod from '../app/common/reducers/selectedPeriod';
import periods from '../app/common/reducers/periods';

describe('application logic', () => {

    describe('select period', () => {
        it('selects a new period', () => {
            const state = '1 day';
            const action = selectPeriod('1 week');
            const nextState = selectedPeriod(state, action);
            expect(nextState).to.equal('1 week');
        });

        it('initializes undefined state', () => {
            const action = selectPeriod('1 month');
            const nextState = selectedPeriod(undefined, action);
            expect(nextState).to.equal('1 month');
        });
    });

    describe('add period', () => {
        it('adds a new period', () => {
            const action = addPeriod('1 week', 128, 256);
            const nextState = periods(undefined, action);
            expect(nextState).to.equal(Immutable.fromJS({
                '1 week': {
                    start: 128,
                    end: 256
                }
            }));
        });
    });
});
