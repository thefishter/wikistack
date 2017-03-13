const express = require('express');
const morgan = require('morgan');
const router = express.Router();


module.exports  = router;

router.get('/', function(req, res, next){
  res.send('Getting all wiki pages!!!')
})


router.post('/', function(req, res, next){
  res.send('	submit a new page to the database')
})

router.get('/add', function(req, res, next){
  res.render('addpage')
})
