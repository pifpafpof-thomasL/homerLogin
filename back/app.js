const express = require('express');
// import express from 'express';
const expressJwt = require('express-jwt');
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


app.use(expressJwt({ secret: auth.jwtSecret })
  // ony thos routes are allowed without JWT token:
  .unless({ path: ['/', '/auth', '/auth/signin'] }));

app.use('/auth', auth.router);

app.use('/birds', birds);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 8030;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
