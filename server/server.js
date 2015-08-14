var express = require('express'),
  path = require('path'),
  app = express(),
  bodyParser = require('body-parser'),
  pack = require('./pack'),

  assetsStats = require('../build/stats.json'),
  js = assetsStats.assetsByChunkName.app.filter(function(file) {
    return path.extname(file) === '.js';
  });

app.use(bodyParser.json());
app.set('view engine', 'jade');
app.set('views', './client');

app.post('/pack', function(req, res) {
  res.json(pack(req.body));
});

app.get('/', function (req, res) {
  res.render('index', { js: js });
});

console.log(js);

app.use(express.static('build'));

app.listen(3000);