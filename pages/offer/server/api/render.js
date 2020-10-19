const libraries = require('../libraries');

module.exports = (library, request) => {
    const dependency = libraries.get(library)();

    return dependency.render(request);
}
