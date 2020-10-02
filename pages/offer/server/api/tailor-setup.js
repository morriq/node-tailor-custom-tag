const { resolve } = require('path');
const { readFileSync } = require('fs');
const RewritingStream = require('parse5-html-rewriting-stream');
const workerFarm = require('worker-farm');

const render = workerFarm(require.resolve('./render'));

module.exports = {
    fetchTemplate(request, parseTemplate) {
        return parseTemplate(readFileSync(resolve(__dirname, '../../app/dist/index.html'), 'utf-8'));
    },
    handledTags: ['library'],
    handleTag: (request, tag, options, context) => {
        if (!tag || tag.name !== 'library') {
            return '';
        }

        // index.html jest nadpisywany przez webpacka bo jest zdefiniowany w webpackclient
        // @todo jesli jest devmode to webpackdevmiddleware i fetchTemplate (tutaj issue na benchmark czy nie trzeba cacheowac produkcyjnie)
        // @TODO integration test
        // @todo czesc kliencka babel runtime, externals zeby reacta nie ladowawc
        // @todo przekazywanie do rendera czesci z requesta, obsluga errorw

        const stream = new RewritingStream();
        const library = tag.attributes.dependency;

        render(library, (error, output) => {
            stream.emitRaw(output);
            stream.end();
        });

        return stream;
    },
};
