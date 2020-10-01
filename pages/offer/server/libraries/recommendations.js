const { Library } = require('../api/library');

class Recommendations extends Library {
    static Package = require('recommendations');

    setup() {
        return {
            recommendationsEndpoint: this.consul.select('SOME_ENDPOINT')
        }
    }
}

exports.Recommendations = Recommendations;
