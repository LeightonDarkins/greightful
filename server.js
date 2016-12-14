const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000; // heroku port or default (3000)

var app = express();

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/home.html');
});

app.get('/thePlaceWhereIPutTheGreightfuls', (req, res) => {
  res.sendFile(__dirname + '/public/html/input.html');
});

app.post('/test', (req, res) => {
  res.send({test: 'test'});
})

app.listen(port, () => {
  console.log('The magic is happening on port ' + port);
});
