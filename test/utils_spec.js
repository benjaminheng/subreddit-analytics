import { expect } from 'chai';
import date from '../app/common/utils/date';

describe('utils', () => {
    describe('date', () => {
        it('represents current time', () => {
            const now = date.now();
            // within 30 seconds
            const start = Date.now()/1000 - 30;
            const end = Date.now()/1000 + 30;
            expect(now).to.within(start, end);
        });

        it('pretty formats date', () => {
            const dateObj = new Date(2015, 5, 1, 15, 0);
            const prettyDate = date.pretty(date.toSeconds(dateObj));
            expect(prettyDate).to.equal('01-06-2015');
        });

        it('converts date to seconds', () => {
            const dateObj = new Date(2015, 5, 1, 15, 0);
            const seconds = date.toSeconds(dateObj);
            expect(seconds).to.equal(1433142000);
        });

        it('converts seconds to date', () => {
            const seconds = 1433142000;
            const dateObj = date.toDate(seconds);
            expect(dateObj.getFullYear()).to.equal(2015);
            expect(dateObj.getMonth()).to.equal(5);
            expect(dateObj.getDate()).to.equal(1);
            expect(dateObj.getHours()).to.equal(15);
            expect(dateObj.getMinutes()).to.equal(0);
        });
    });
});
