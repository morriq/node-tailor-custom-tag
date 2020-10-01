const { Library } = require('../api/library');

class Header extends Library {
    package = require('header');
}

exports.Header = Header;
