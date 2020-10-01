const RewritingStream = require('parse5-html-rewriting-stream');

class Library extends RewritingStream {
    consul = {
        select: () => 'endpoint'
    }

    package = null;

    passToPackage(request) {
        return {}
    }

    render(request) {
        const renderFn = this.package(() => this.passToPackage(request));

        renderFn()
            .then(markup => {
                this.emitRaw(markup);
                this.end();
            })
            .catch(error => {
                console.log(error);
                this.end();
            });

        return this;
    }
}

exports.Library = Library;
