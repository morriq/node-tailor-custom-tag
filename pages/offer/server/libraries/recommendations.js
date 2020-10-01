const { Library } = require('../api/library');

class Recommendations extends Library {
    package = require('recommendations');

    setup(request) {
        return {
            recommendationsEndpoint: this.consul.select('SOME_ENDPOINT')
        }
    }
}

exports.Recommendations = Recommendations;
