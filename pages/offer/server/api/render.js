const libraries = require('../libraries');

module.exports = async (library, callback) => {
    const dependency = libraries.get(library)();

    dependency.render()
        .then(markup => callback(null, markup))
        .catch(error => callback(error, null));
}
