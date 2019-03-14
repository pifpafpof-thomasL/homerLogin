const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const msql = require('./configMysql');

const router = express.Router();
const jwtSecret = 'blablabla';


// #client registering for the first time
router.post('/signup', (req, res) => {
  const { body } = req;
  console.log('Demande /signup reçue', body.email);

  if (!body.password || !body.email) {
    res.status(500).send(`Erreur données login manquantes ${body}`);
  } else {
    const hashedPassword = bcrypt.hashSync(body.password, 10);
    // const isSame = bcrypt.compareSync(body.password, hashedPassword);
    // console.log('Demande /signup reçue', body, isSame);

    const myquery = `INSERT INTO employee (email, password) VALUES \
      ('${body.email}', '${hashedPassword}');`;
    // console.log("myquery", myquery);
    msql.query(
      myquery,
      body, (err) => {
        if (err) {
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          console.log(err.sqlMessage);
          // res.status(500).send(`Erreur lors de la sauvegarde d'un employé ${err.sqlMessage}`);
          res.status(500).send({ flash: `Erreur MySQL: ${err.sqlMessage}` });
        } else {
          // Si tout s'est bien passé, on envoie un statut 'ok'.
          console.log(`User ${body.email} added`);
          res.status(200).send({ flash: 'signup ok' });
        }
        res.end();
      }
    );
  }
});


router.post('/signin', (req, res) => {
  const { body } = req;

  console.log('/signin request with body ', body.email);
  msql.query(`SELECT email, password from employee where \
    email = '${body.email}';`,
  (err, results) => {
    // TODO envoyer les données récupérées (étape 3)
    if (err) {
      console.log('/sigin Mysql error: ', err.sqlMessage);
      res.status(400).send({ flash: `Erreur MySQL: ${err.sqlMessage}` });
    } else {
      const hashedPassword = results[0].password;
      // console.log('/signin MysQL results ', hashedPassword, results);

      const isRightPassword = bcrypt.compareSync(body.password, hashedPassword);
      console.log('/signin email password matching on MySQL',
        results, isRightPassword);
      if (isRightPassword) {
        // création d'un token
        const token = jwt.sign({
          username: body.email
        }, jwtSecret, { expiresIn: '12h' });
        res.status(200).send({ flash: 'signin ok', token });
        // res.send({ flash: 'signin ok' });
      } else {
        res.status(403).send({ flash: 'Login or Password Error' });
      }
    }
  });
});

module.exports = { router, jwtSecret };
// module.exports = router;
