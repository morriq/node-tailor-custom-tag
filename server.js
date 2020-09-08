const http = require('http');
const Tailor = require('node-tailor');
const RewritingStream = require('parse5-html-rewriting-stream');

const tailor = new Tailor({
  templatesPath: __dirname + '/index.html',
  handledTags: ['library'],
  handleTag: (request, tag, options, context) => {
    if (!tag || tag.name !== 'library') {
      return '';
    }

    const dependencies = new Map([
      [
        'recommendations',
        require('recommendations')(() => ({
          recommendationsEndpoint: '0://',
        })),
      ],
    ]);
    const dependency = dependencies.get(tag.attributes.dependency);
    const rewriter = new RewritingStream();

    dependency().then((markup) => {
      rewriter.emitRaw(markup);
      rewriter.end();
    });

    return rewriter;
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
