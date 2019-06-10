const route = require('express').Router();
const controller = require('../controllers/event.controller')

route.get('/events', controller.listEvents);
route.get('/events/:id', controller.getEvent);

module.exports = route;