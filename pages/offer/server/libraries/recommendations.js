const { Library } = require('../api/library');

const asyncSomething = (response, timeout) =>
    new Promise((resolve) => setTimeout(() => resolve(response), timeout));

class Recommendations extends Library {
    package = require('recommendations');

    passToPackage(request) {
        return Promise.all([
            asyncSomething({ name: 'John' }, 1000),
            asyncSomething([1, 23, 4], 100),
        ]).then(([user, numbers]) => ({ user, numbers }))
    }
}

exports.Recommendations = Recommendations;
