const RewritingStream = require('parse5-html-rewriting-stream');

class Library extends RewritingStream {
    static Package = null;

    consul = {
        select: () => 'endpoint'
    }

    setup() {
        return {}
    }

    render() {
        const renderFn = this.constructor.Package(() => this.setup());
        renderFn()
            .then(markup => {
                this.emitRaw(markup);
                this.end();
            });

        return this;
    }
}

exports.Library = Library;
