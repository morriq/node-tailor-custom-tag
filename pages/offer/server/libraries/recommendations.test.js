/**
 * @jest-environment node
 */
const RewritingStream = require('parse5-html-rewriting-stream');

const stream = new RewritingStream();
const { streamResolver, payloadResolver } = require('./recommendations.js');

test('', (done) => {
    const markup = '<div id="rec"><div>recommendations</div></div><script>window.__PRELOADED_STATE__={"user":{"name":"John"},"numbers":[1,23,4]}</script>';
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
