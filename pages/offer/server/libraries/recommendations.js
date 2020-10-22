const asyncSomething = (response, timeout) =>
    new Promise((resolve) => setTimeout(() => resolve(response), timeout));

const streamResolver = require('recommendations');

const payloadResolver = (request) => Promise.all([
    asyncSomething({ name: 'John' }, 1000),
    asyncSomething([1, 23, 4], 100),
]).then(([user, numbers]) => ({ user, numbers }));

module.exports = {streamResolver, payloadResolver};
