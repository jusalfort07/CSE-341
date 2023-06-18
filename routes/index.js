const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

// routes.get('/', lesson1Controller.laishRoute);
routes.get('/alfred', lesson1Controller.alfredRoute);
routes.get('/', require('./swagger'));

module.exports = routes;
