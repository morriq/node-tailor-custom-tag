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

            // npm start z node_env production
            // NEXT GATLING

            // index.html jest nadpisywany przez webpacka bo jest zdefiniowany w webpackclient
            // @todo jesli jest devmode to webpackdevmiddleware
            // @TODO integration test
            // @todo czesc kliencka babel runtime, externals zeby reacta nie ladowawc
            // @todo przekazywanie do rendera czesci z requesta, obsluga errorw
            // @todo pactio
            // https://github.com/GrupaPracuj/GP.Kansas/compare/redefined?expand=1
            
            const stream = new RewritingStream();
            const library = tag.attributes.dependency;

            render(library, (error, output) => {
                if (output) {
                    stream.emitRaw(output);
                }
                if (error) {
                    console.log(error);
                }
                stream.end();
            });

            return stream;
        },
    };
}
