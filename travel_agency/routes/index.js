var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'SNCF Voyage',
    user: req.cookies.user ? req.cookies.user : null
  });
});

module.exports = router;
