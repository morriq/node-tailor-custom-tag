const Tailor = require('node-tailor');
const express = require('express');
const { resolve } = require('path');

const tailorSetup = require('./api/tailor-setup');
const webpackMiddleware = require('./webpack-middleware');


const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';
const { requestHandler } = new Tailor(tailorSetup({
    isTemplateCached: isProduction
}));
const appRoot = express();

appRoot
    .use('/', express.static(resolve(__dirname, '../app/dist'), { index: false }))
    .use(webpackMiddleware({
        disabled: isProduction
    }))
    .get('/', requestHandler)
    .listen(8080, function () {
        console.log('Tailor server listening on port 8080');
    });

const appFragment = express();

appFragment
    .get('/', (request, response, next) => {
        response.type('text/html').end('<div>fragment1</div>');
        next();
    })
      .listen(8081, function () {
        console.log('Fragment Server listening on port 8081');
      });
