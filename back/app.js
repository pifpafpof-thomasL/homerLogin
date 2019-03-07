// const express = require('express');
import express from 'express';

const app = express();
const birds = require('./routage');
const auth = require('./routes/auth/auth');

app.use('/auth', auth);

app.use('/birds', birds);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
