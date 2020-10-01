const RewritingStream = require('parse5-html-rewriting-stream');

class Library extends RewritingStream {
    consul = {
        select: () => 'endpoint'
    }

    package = null;

    setup(request) {
        return {}
    }

    render(request) {
        const renderFn = this.package(() => this.setup(request));
        renderFn()
            .then(markup => {
                this.emitRaw(markup);
                this.end();
            });

        return this;
    }
}

exports.Library = Library;
