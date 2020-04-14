const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function(req, res) {
    res.send('list of all users boom!!!');
});

router.get('/:id', function(req, res) {
    res.send(`get user by ${req.params.id}`);
});

// define the about route
router.post('/', function(req, res) {
    res.send('update user');
});

module.exports = router;
