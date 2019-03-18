const express = require('express');
// import express from 'express';
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');

const app = express();
const profile = require('./profile');
const auth = require('./routes/auth/auth');


// To support JSON-encoded bodies
app.use(bodyParser.json());
// To support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
}));


app.use(expressJwt({ secret: auth.jwtSecret })
  // only those routes are allowed without JWT token:
  .unless({ path: ['/', '/auth/signin', '/auth/signup'] }));

app.use('/auth', auth.router);

app.use('/profile', profile);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 8030;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
