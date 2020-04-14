// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const handler = require('./function/handler');

async function init() {
    console.log('init()');
    
    await handler({ app, data: 'abc'  });

    const port = process.env.http_port || 3000;

    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.raw());
    app.use(bodyParser.text({ type: 'text/*' }));
    app.use(cors());
    app.disable('x-powered-by');

    // General routes
    app.get('/healthz', (req, res) => {
        console.log('inside healthz...');
        
        res.sendStatus(200);
    });

    app.listen(port, () => {
        console.log(`${process.env.NAME}, listening on port: ${port}`);
    });
}

init();
