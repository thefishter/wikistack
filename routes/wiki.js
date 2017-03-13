const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const models = require('../models')

var Page = models.Page; 
var User = models.User;

module.exports  = router;

router.get('/', function(req, res, next){
  res.redirect('/');
})


router.post('/', function(req, res, next){
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save();
  // res.redirect('/');
  res.json(page);
})

router.get('/add', function(req, res, next){
  res.render('addpage')
})


