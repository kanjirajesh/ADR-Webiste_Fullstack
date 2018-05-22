var express = require('express');
var router  = express.Router();
var csrf    = require('csurf')
//var User     = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ADR Application !' });
});

module.exports = router;
