import { expect } from 'chai';
import date from '../app/common/utils/date';
import markdown from '../app/common/utils/markdown';

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
    describe('markdown', () => {
        it('ignores code blocks', () => {
            const text = `
\`\`\`
function log(text) {
    console.log(text);
}
\`\`\`
            `;
            const words = markdown.getWords(text);
            expect(words).to.equal('');
        });

        it('removes blockquote markup', () => {
            const text = `> Quoted text`;
            const words = markdown.getWords(text);
            expect(words).to.equal('Quoted text');
        });

        it('sanitizes html markup', () => {
            const text = `Click <a href='#'>here</a>`;
            const words = markdown.getWords(text);
            expect(words).to.equal('Click &lt;a href=&#39;#&#39;&gt;here&lt;/a&gt;');
        });


        it('removes heading markup', () => {
            const text = `# Title of post`;
            const words = markdown.getWords(text);
            expect(words).to.equal('Title of post');
        });

        it('removes horizontal-rule markup', () => {
            const text = `-----`;
            const words = markdown.getWords(text);
            expect(words).to.equal('');
        });

        it('removes table markup', () => {
            const text = `
Foo | Bar
---|---
Fizz | Buzz
            `;
            const words = markdown.getWords(text);
            expect(words).to.equal('Foo Bar Fizz Buzz');
        });

        it('removes bold (strong) markup', () => {
            const text = `**Bolded text**`;
            const words = markdown.getWords(text);
            expect(words).to.equal('Bolded text');
        });

        it('removes emphasis (em) markup', () => {
            const text = `*Emphasized text*`;
            const words = markdown.getWords(text);
            expect(words).to.equal('Emphasized text');
        });

        it('removes codespan markup', () => {
            const text = `API: \`GET /users\``;
            const words = markdown.getWords(text);
            expect(words).to.equal('API: GET /users');
        });

        it('removes strikethrough markup', () => {
            const text = `~~Strikethrough text~~`;
            const words = markdown.getWords(text);
            expect(words).to.equal('Strikethrough text');
        });

        it('removes link markup', () => {
            const text = `[My profile](http://example.com/profile)`;
            const words = markdown.getWords(text);
            expect(words).to.equal('My profile');
        });

        it('ignores image markup', () => {
            const text = `![My picture](http://example.com/picture)`;
            const words = markdown.getWords(text);
            expect(words).to.equal('');
        });

        it('extracts text from markdown', () => {
            const text = `
# Title of post

**Bolded text**

- List item 1
- List item 2

\`\`\`python
def do_nothing():
    pass
\`\`\`
            `;
            const words = markdown.getWords(text);
            expect(words).to.equal('Title of post Bolded text List item 1 List item 2');
        });
    });
});
