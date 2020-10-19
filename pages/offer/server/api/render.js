const libraries = require('../libraries');

module.exports = async (library, request, callback) => {
    const dependency = libraries.get(library)();

    dependency.render(request)
        .then(markup => callback(null, markup))
        .catch(error => callback(error, null));
}
