const { Library } = require('../api/library');

class Recommendations extends Library {
    package = require('recommendations');

    passToPackage(request) {
        return {
            recommendationsEndpoint: this.consul.select('SOME_ENDPOINT')
        }
    }
}

exports.Recommendations = Recommendations;
