const { resolve } = require('path');

const libraries = require('../libraries');

module.exports = {
    templatesPath: resolve(__dirname, '../../app/dist/index.html'),
    handledTags: ['library'],
    handleTag: (request, tag, options, context) => {
        if (!tag || tag.name !== 'library') {
            return '';
        }

        // @TODO integration test
        // @TODO https://stackoverflow.com/questions/53975046/node-js-pipe-a-stream-out-of-a-forked-child-process
        // @TODO CZESC SERWEROWA PACZEK - ODSWIEZANIE W DEVMODE, devmiddleware i hot
        // @todo czesc kliencka babel runtime, externals zeby reacta nie ladowawc

        const dependency = libraries.get(tag.attributes.dependency)();

        return dependency.render(request);
    },
};

