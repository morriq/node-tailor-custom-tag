const express = require('express');
const axios = require('axios');

const app = express();

app
    .get('/', async (req, response, next) => {
        const { data } = await axios.get('http://localhost:59018/recommendations')

        response.type('text/html');

        data.data.forEach(elem => {
            response.write(elem.jobTitle);
        });
        response.end();
        next();
    })

    app
    .listen(4000);
