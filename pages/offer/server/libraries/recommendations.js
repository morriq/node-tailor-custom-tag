const { resolve } = require('path');

const { Library } = require('../api/library');

class Recommendations extends Library {
    entrypoint = resolve(require.resolve('recommendations'), '../client.js');

    package = require('recommendations');

    passToPackage(request) {
        return {
            recommendationsEndpoint: this.consul.select('SOME_ENDPOINT')
        }
    }
}

exports.Recommendations = Recommendations;
