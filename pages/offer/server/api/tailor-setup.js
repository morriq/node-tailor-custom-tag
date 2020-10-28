const { resolve } = require('path');
const { readFileSync } = require('fs');
const RewritingStream = require('parse5-html-rewriting-stream');

const libraries = require('../libraries');

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

            const { payloadResolver, streamResolver } = libraries.get(library);

            payloadResolver(request)
                .then(payload => {
                    const markupStream = streamResolver(payload);

                    markupStream.on('end', () => stream.end());
                    markupStream.on('error', (error) => {
                        console.error(error);
                        stream.end();
                    });
                    markupStream.on('data',(markup) =>  stream.emitRaw(markup));
                })
                .catch(error => {
                    console.log(error);
                });

            return stream;
        },
    };
}
