const { resolve } = require('path');
const { readFileSync } = require('fs');
const RewritingStream = require('parse5-html-rewriting-stream');
const workerFarm = require('worker-farm');

const render = workerFarm(require.resolve('./render'));

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

            // @todo czesc kliencka babel runtime, externals zeby reacta nie ladowawc
            // @todo pactio
            // https://github.com/GrupaPracuj/GP.Kansas/compare/redefined?expand=1

            const stream = new RewritingStream();
            const library = tag.attributes.dependency;

            render(library, (error, output) => {
                if (output) {
                    stream.emitRaw(output);
                }
                if (error) {
                    console.error(error);
                }
                stream.end();
            });

            return stream;
        },
    };
}
