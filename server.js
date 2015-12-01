var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var port = 8080;
var db = mongojs('birdSightings', ['sightings']); //create database and collection

app.use(bodyParser.json());

app.listen(port, function() {
  console.log('Server running at ' + port);
});

app.get('/api/sighting', function(req, res) {
  db.sightings.find({}, function(err, results) {
    if(!err) {
      res.send(results);
    }
  });
});

app.post('/api/sighting', function(req, res) {
  db.sightings.insert(req.body, function(err, results) {
    if(!err) {
      // console.log(results);
      res.status(201).end();
    }
  });
});

app.put('/api/sighting/:id', function(req, res) {
  db.sightings.update({_id: mongojs.ObjectId(req.params.id)}, {$set: req.body}, function(err, results) {
    console.log(results);
    res.status(200).end();
  });
});

app.delete('/api/sighting/:id', function(req, res) {
  db.sightings.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, results) {
    if (!err) {
      console.log(results);
      res.status(200).end();
    }
  });
});
