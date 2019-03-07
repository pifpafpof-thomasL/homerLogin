const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', // adresse du serveur
  user: 'username', // le nom d'utilisateur
  password: 'password', // le mot de passe
  database: 'sqlquests', // le nom de la base de données
});


module.exports = connection;
