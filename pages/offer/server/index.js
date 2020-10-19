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
    .get('/', requestHandler)
    .use(webpackMiddleware({
        disabled: isProduction
    }))
    .listen(8080, function () {
        console.log('Tailor server listening on port 8080');
    });
