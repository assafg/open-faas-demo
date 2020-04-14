'use strict';
require('newrelic');


module.exports = async ({ app, jwtCheck }) => {
    
    app.get('/account', (req, res) => {
        res.send({ message: 'account service' });
    });
};
