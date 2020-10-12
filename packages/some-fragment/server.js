const express = require('express');

const app = express();

app
    .get('/', (req, response, next) => {
        response.type('text/html').end('<div>fragment1</div>');
        next();
    })

    app
    .listen(8081);
