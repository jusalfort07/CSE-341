const routes = require('express').Router();
const lesson2Controller = require('../controllers/lesson2')

routes.get('/', lesson2Controller.getContacts);
routes.get('/:id', lesson2Controller.getContact);

module.exports = routes;