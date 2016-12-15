const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/home.html');
});

app.get('/input', (req, res) => {
  res.sendFile(__dirname + '/public/html/input.html');
});

app.get('/greightful', (req, res) => {

  let greightfuls = [
    {greightfulContent: 'Madeline', date: '01/01/2017', likes: '10', dislikes: '25'},
    {greightfulContent: 'Pineapple on pizza', date: '01/01/2017', likes: '100', dislikes: '5'},
    {greightfulContent: 'Jogging', date: '01/01/2017', likes: '0', dislikes: '55'},
    {greightfulContent: 'Breathing', date: '01/01/2017', likes: '5', dislikes: '33'},
    {greightfulContent: 'Airline safety videos', date: '01/01/2017', likes: '1132', dislikes: '86'},
    {greightfulContent: 'Comfy shoes', date: '01/01/2017', likes: '10', dislikes: '90'},
    {greightfulContent: 'The use of my legs', date: '01/01/2017', likes: '4', dislikes: '77'}
  ]

  let item = _.sample(greightfuls);

  setTimeout(() => {
    res.send(item);
  }, 4000);
});

app.post('/greightful', (req, res) => {
  let greightfulContent = req.body.greightfulContent;

  if (!greightfulContent) {
    res.status(400).send({});
  }

  let day = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();

  let date = `${day}/${month}/${year}`;

  setTimeout(() => {
    res.send({ greightfulContent, date });
  }, 2000);
});

app.listen(port, () => {
  console.log('The magic is happening on port ' + port);
});
