/**
 * @jest-environment node
 */

const { Recommendations } = require('./recommendations.js');

test('', (done) => {
    const markup = '<div id="rec"><div>recommendations</div></div><script>window.__PRELOADED_STATE__={"user":{"name":"John"},"numbers":[1,23,4]}</script>';
    new Recommendations().render()
        .then(response => expect(response).toEqual(markup))
        .then(done);
});
