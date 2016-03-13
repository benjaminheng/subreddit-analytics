import marked from 'marked';

let renderer = new marked.Renderer();

['blockquote', 'heading', 'list', 'listitem', 'paragraph',
'tablerow', 'tablecell', 'strong', 'em', 'codespan', 'del'].map(name => {
    renderer[name] = textPassthrough;
});

['hr', 'code', 'image'].map(name => {
    renderer[name] = ignoreMarkup;
});

renderer.table = (header, body) => {
    return `${header} ${body}`;
}

renderer.link = (href, title, text) => {
    return text;
}

function ignoreMarkup() {
    return '';
}

function textPassthrough(text) {
    return `${text} `;
}

// Returns a space-separated list of words
function getWords(markdownString) {
    let words = marked(markdownString, {
        renderer: renderer,
        sanitize: true
    });
    words = words.replace(/\s{2,}/g, ' ').trim();
    return words;
}

export default {
    getWords
}
