const route = require('express').Router();
const controller = require('../controllers/poll.controller')

route.post('/polls', controller.createPoll);
route.get('/polls/:id', controller.getPoll);
route.put('/polls/:id', controller.updatePoll);
route.delete('/polls/:id', controller.deletePoll);

module.exports = route;