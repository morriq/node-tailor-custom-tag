const { resolve } = require('path');

const { Library } = require('../api/library');

class Header extends Library {
    entrypoint = resolve(require.resolve('recommendations'), '../client.js');

    package = require('header');
}

exports.Header = Header;
