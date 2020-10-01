const { resolve } = require('path');
const { readFileSync } = require('fs');

const libraries = require('../libraries');

module.exports = {
    fetchTemplate(request, parseTemplate) {
        return parseTemplate(readFileSync(resolve(resolve(__dirname, '../../app/dist/index.html', 'utf-8'))));
    },
    handledTags: ['library'],
    handleTag: (request, tag, options, context) => {
        if (!tag || tag.name !== 'library') {
            return '';
        }

        // index.html jest nadpisywany przez webpacka bo jest zdefiniowany w webpackclient
        // @todo jesli jest devmode to webpackdevmiddleware i fetchTemplate (tutaj issue na benchmark czy nie trzeba cacheowac produkcyjnie)
        // @TODO integration test
        // @TODO https://stackoverflow.com/questions/53975046/node-js-pipe-a-stream-out-of-a-forked-child-process
        // @todo czesc kliencka babel runtime, externals zeby reacta nie ladowawc

        const dependency = libraries.get(tag.attributes.dependency)();

        return dependency.render(request);
    },
};
