/**
 * @jest-environment node
 */

const { Header } = require('./header.js');

test('', (done) => {
    const markup = '<div id="header"><div>header</div></div><script>window.__PRELOADED_STATE__={"user":{"name":"John"},"numbers":[1,23,4]}</script>';
    new Header().render()
        .then(response => expect(response).toEqual(markup))
        .then(done);
});
