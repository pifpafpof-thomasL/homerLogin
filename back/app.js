// const express = require('express');
import express from 'express';

const bodyParser = require('body-parser');

const app = express();
const birds = require('./birds');
const auth = require('./routes/auth/auth');

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
}));


app.use('/auth', auth);

app.use('/birds', birds);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 8030;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
