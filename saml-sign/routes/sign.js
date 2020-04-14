const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/:source', function(req, res) {
    res.send({ data: req.params.source });
});

module.exports = router;
