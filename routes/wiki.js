const express = require('express');
const morgan = require('morgan');
const router = express.Router();


module.exports  = router;

router.get('/', function(req, res, next){
  res.redirect('/');
})


router.post('/', function(req, res, next){
  //res.send('hello');
  res.json(req.body);
  //next();
})

router.get('/add', function(req, res, next){
  res.render('addpage')
})
