//constructor donde se inyectara una base de datos para poder 
//acceder a varias bdd 
const db = require('../../DB/mysql');
const ctrl = require('./controlador');

module.exports = ctrl(db);