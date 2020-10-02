const libraries = require('../libraries');

module.exports = async (library, callback) => {
    const dependency = libraries.get(library)();

    const markup = await dependency.render();

    callback(null, markup)
}
