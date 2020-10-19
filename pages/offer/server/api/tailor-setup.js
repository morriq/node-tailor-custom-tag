const { resolve } = require('path');
const { readFileSync } = require('fs');
const RewritingStream = require('parse5-html-rewriting-stream');

const render = require('./render.js');

const loadTemplate = () => readFileSync(resolve(__dirname, '../../app/dist/index.html'), 'utf-8');

const templateResolver = ({ isTemplateCached }) => {
    let template = isTemplateCached ? loadTemplate() : '';

    return (request, parseTemplate) => {
        return parseTemplate(template ? template : loadTemplate());
    };
}

module.exports = ({ isTemplateCached }) => {
    return {
        fetchTemplate: templateResolver({ isTemplateCached }),
        handledTags: ['library'],
        handleTag: (request, tag, options, context) => {
            if (!tag || tag.name !== 'library') {
                return '';
            }

            const stream = new RewritingStream();
            const library = tag.attributes.dependency;

            const markupStream = render(library, request);

            markupStream.on('end', () => stream.end());
            markupStream.on('error', (error) => {
                console.error(error);
            });
            markupStream.on('data',(markup) =>  stream.emitRaw(markup));

            return stream;
        },
    };
}
