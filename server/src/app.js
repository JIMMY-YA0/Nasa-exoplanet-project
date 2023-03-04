const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');
const app = express();

//middleware
//deal with CORS
app.use(cors());
//deal with logs
app.use(morgan('combined'));

//deal with body requests
app.use(express.json());

//serving static files
app.use(express.static(path.join(__dirname, '..', 'public')));
//routers

app.use('/v1', api);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
