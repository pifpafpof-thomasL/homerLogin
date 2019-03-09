const express = require('express');
// import express from 'express';
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');

const app = express();
const birds = require('./birds');
const auth = require('./routes/auth/auth');

// app.use(expressJwt({ secret: 'shhhhhhared-secret' }).unless({ path: ['/token'] }));

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
}));

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

app.use(expressJwt({ secret: auth.jwtSecret }).unless({ path: ['/', '/auth/signup'] }));

app.use('/auth', auth.router);

app.use('/birds', birds);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 8030;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
