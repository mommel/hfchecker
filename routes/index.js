var express = require('express');
var router = express.Router();
var share = require('social-share');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/redirect', function(req, res) {
  var url = share(req.query.service, req.query);
  res.redirect(url);
});

module.exports = router;
