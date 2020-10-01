const http = require('http');
const Tailor = require('node-tailor');

const libraries = require('./libraries');

const tailor = new Tailor({
  templatesPath: __dirname + '/index.html',
  handledTags: ['library'],
  handleTag: (request, tag, options, context) => {
    if (!tag || tag.name !== 'library') {
      return '';
    }

    // @TODO integration test
    // @TODO https://stackoverflow.com/questions/53975046/node-js-pipe-a-stream-out-of-a-forked-child-process
    // @TODO client bundle definicja - nie ma czesci clienta? offer bierze dist/server.js i wciaga w swoje entrypointy?
      // @TODO CZESC SERWEROWA PACZEK - ODSWIEZANIE W DEVMODE

    const dependency = libraries.get(tag.attributes.dependency);

    return dependency.render();
  },
});

// Root Server
http
  .createServer((req, res) => {
    tailor.requestHandler(req, res);
  })
  .listen(8080, function () {
    console.log('Tailor server listening on port 8080');
  });

// Fragment server - Any http server that can serve fragments
http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end('<div>Fragment 1</div>');
  })
  .listen(8081, function () {
    console.log('Fragment Server listening on port 8081');
  });
