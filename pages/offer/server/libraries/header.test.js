/**
 * @jest-environment node
 */
const RewritingStream = require('parse5-html-rewriting-stream');

const stream = new RewritingStream();
const { streamResolver, payloadResolver } = require('./header.js');

test('', (done) => {
    const markup = '<div id="header"><div>header</div></div><script>window.__PRELOADED_STATE__={}</script>';
    const request = () => {};
    payloadResolver(request)
        .then(payload => {
            const markupStream = streamResolver(payload);

            markupStream.on('end', () => stream.end());
            markupStream.on('error', (error) => {
                console.error(error);
            });
            markupStream.on('data',(markup) =>  stream.emitRaw(markup));
        });

    stream.on('data', (data) => {
        expect(data).toEqual(markup);
        done()
    })
});
