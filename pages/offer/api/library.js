const RewritingStream = require('parse5-html-rewriting-stream');

class Library extends RewritingStream {
    consul = () => 'http://endpoint-to-service';

    package = null;

    setup() {
        return {}
    }

    render() {
        const renderFn = this.package(() => this.setup());
        renderFn()
            .then(markup => {
                this.emitRaw(markup);
                this.end();
            });

        return this;
    }
}

exports.Library = Library;
