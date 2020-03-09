const path = require('path');
const express = require('express');
const fs = require('fs');
const gallery = require('./gallery');
const moment = require('moment');
const app = express();


app.use(express.static('public/images'));


// --- Run ejs --- //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// --- Moment module for the date in footer --- //
app.locals.twentyTwenty = function(){
  return moment().format('YYYY');
}


// --- GET endpoint handlers --- //
app.get('/', function(req, res){
  res.render('index');
});

app.get('/gallery', function(req, res) {
  res.render('gallery', {gallery});
});

app.get('/gallery/:id', function(req, res, next){
  for(photo of gallery){
    if(photo.id == req.params.id){
      res.render('id',{title: `${req.params.id}`});
      return;
    }
  }
  next();
});


// --- Serving static assets --- //
app.use(express.static(path.join(__dirname, '/public')));


// --- 404 error page --- //
app.use(function(req, res){
  res.writeHead(404, {'Content-Type': 'text/html'});
  fs.createReadStream(__dirname + '/404.html').pipe(res);
});


// --- Localhost: 3000 --- //
const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});