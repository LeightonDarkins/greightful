require('./config/config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');

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
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log('The magic is happening on port ' + port);
});
