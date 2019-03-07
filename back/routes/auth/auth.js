const express = require('express');

const router = express.Router();
// let toto = 5;

router.post('/signup', (req, res, next) => {
  res.send('I am in POST signup');
});


router.get('/signup', (req, res, next) => {
  res.send('I am in PUT signup');
});

module.exports = router;
