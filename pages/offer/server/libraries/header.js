const streamResolver = require('header');

const payloadResolver = (request) => Promise.resolve({});

module.exports = {streamResolver, payloadResolver};
