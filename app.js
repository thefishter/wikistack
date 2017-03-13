const express = require('express');
const morgan = require('morgan');
const nunjucks = require("nunjucks");
const bodyParser = require('body-parser');
const models = require('./models');
var wikiRouter = require('./routes/wiki');



var app = express();
var router = express.Router();


app.use('/wiki', wikiRouter);
// or, in one line: app.use('/wiki', require('./routes/wiki'));

app.use(express.static('public'));

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {
	noCache: true
});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


// var server = app.listen(3001, function() {
//     console.log("server set up");
// })

app.get("/", function(req, res, next) {
	res.send("hello!");
})


models.User.sync({})
  .then(function () {
    return models.Page.sync({})
  })
  .then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
  })
  .catch(console.error);
