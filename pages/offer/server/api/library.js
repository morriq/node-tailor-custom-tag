
class Library {
    consul = {
        select: () => 'endpoint'
    }

    package = null;

    passToPackage(request) {
        return {}
    }

    render(request) {
        const renderFn = this.package(() => this.passToPackage(request));

        return renderFn();
    }
}

exports.Library = Library;
