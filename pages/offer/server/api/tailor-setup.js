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
        // @TODO client bundle definicja - nie ma czesci clienta? offer bierze dist/server.js i wciaga w swoje entrypointy?
        // @TODO CZESC SERWEROWA PACZEK - ODSWIEZANIE W DEVMODE, devmiddleware i hot

        const dependency = libraries.get(tag.attributes.dependency);

        return dependency.render(request);
    },
};

