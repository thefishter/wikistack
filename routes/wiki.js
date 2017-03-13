const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const models = require('../models')

var Page = models.Page;
var User = models.User;

module.exports  = router;


router.get('/', function(req, res, next){
  Page.findAll().then(function(foundPages){
    res.render('index', {
      pages: foundPages
    })
  })
  .catch(next);
})




router.post('/', function(req, res, next){
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function (values) {

    var user = values[0];

    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });

    return page.save().then(function (page) {
      return page.setAuthor(user);
    });

  })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(next);
})





router.get('/add', function(req, res, next){
  res.render('addpage')
})


router.get('/:urlTitle', function(req, res, next){
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  }).then(function(foundPage){
    //res.json(foundPage);
    res.render('wikipage', {
      page: foundPage
    })
  })
  .catch(next);
})

