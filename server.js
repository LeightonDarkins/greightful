require('./config/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Greightful } = require('./models/greightful');
var dateHelper = require('./helpers/dateHelper');
var errorHelper = require('./helpers/errorHelper');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/home.html');
});

app.get('/input', (req, res) => {
  res.sendFile(__dirname + '/public/html/input.html');
});

app.get('/greightful', (req, res) => {
  Greightful.count().exec((err, count) => {
    errorHelper.handleError(err, res);

    var random = Math.floor(Math.random() * count);

    Greightful.findOne().skip(random).exec((err, doc) => {
      errorHelper.handleError(err, res);

      res.send(doc);
    });
  });
});

app.post('/greightful', (req, res) => {
  let greightfulContent = req.body.greightfulContent;

  var date = dateHelper.getDate();

  var greightful = new Greightful({ greightfulContent, date });

  greightful.save().then((doc) => {
    res.status(201).send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.put('/greightful', (req, res) => {
  if (!req.body) {
    res.status(400).send();
  }

  var updateFields = _.pick(req.body, ['_id', 'greightfulContent', 'date', 'likes', 'dislikes']);

  if(!ObjectID.isValid(updateFields._id)) {
    res.status(404).send();
  }

  Greightful.findByIdAndUpdate(updateFields._id, { $set: updateFields }).then((doc) => {
    res.send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  });

});

app.listen(port, () => {
  console.log('The magic is happening on port ' + port);
});
