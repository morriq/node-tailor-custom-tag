const { Recommendations } = require('./recommendations');

module.exports = new Map([
    ['recommendations', () => new Recommendations]
]);
