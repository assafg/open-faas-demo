'use strict';
require('newrelic');

const user = require('./routes/sign');

module.exports = async ({ app, data }) => {
    app.use('/sign', user);
};
