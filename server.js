const http = require('http');
const Tailor = require('node-tailor');
const processTemplate = require('node-tailor/lib/process-template');

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
        require('recommendations')({
          recommendationsEndpoint: '0://',
        }),
      ],
    ]);
    const dependency = dependencies.get(tag.attributes.dependency);

    dependency().then((markup) => {
      options.parseTemplate(markup, null, false).then((parsedTemplate) => {
        parsedTemplate.forEach((item) => {
          st.write(item);
        });
        st.end();
      });
    });
    const st = processTemplate(request, options, context);

    return st;
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
