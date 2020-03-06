const path = require('path');
const express = require('express');
const fs = require('fs');
const gallery = require('./gallery');


// --- Run express --- //
const app = express();


// --- Run pug run --- //
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// --- GET endpoint handlers --- //

// app.get('/', function(req, res) {
//   res.render('index', {gallery});
// })


app.get('/', function(req, res) {
  res.render('index', {gallery});
})





// app.get('/', function(req, res){
//   res.render('index', gallery);
// })

// app.get('/', function( req, res) {
//   res.json(gallery.id);
// })

app.get('/gallery', function(req, res) {
  res.json(gallery);
});
 

app.get('/gallery/:id', function(req, res){
  res.json(gallery.filter(function(gallery){
    return gallery.id == req.params.id;
  }));
});


// --- Serving static assets --- //
app.use(express.static(path.join(__dirname, 'public')));


// --- 404 error page --- //
app.use(function(req, res, next){
  res.writeHead(404, {'Content-Type': 'text/html'});
  fs.createReadStream(__dirname + '/404.html').pipe(res);
});


// --- Localhost: 3000 --- //
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});