const { Library } = require('../api/library');

class Recommendations extends Library {
    package = require('recommendations');

    setup() {
        return {
            recommendationsEndpoint: this.consul()
        }
    }
}

exports.Recommendations = Recommendations;
