const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

app.use(morgan);
express.static(path.join(__dirname, '../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', require('../apiRoutes'));

app.use('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error...');
});

app.listen(3000, function() {
  console.log('Greetings, sir.');
  console.log('Your server has been initialized.');
  console.log('You may access it on port 3000, if you wish.');
});
