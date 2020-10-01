const { Recommendations } = require('./recommendations');
const { Header } = require('./header');

module.exports = new Map([
    ['header', () => new Header],
    ['recommendations', () => new Recommendations]
]);
