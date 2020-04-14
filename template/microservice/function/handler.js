'use strict';
require('newrelic');

const user = require('./routes/user');

module.exports = async ({ app }) => {
    app.use('/user', user);
};
