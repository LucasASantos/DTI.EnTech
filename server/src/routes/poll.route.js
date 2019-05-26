const route = require('express').Router();
const controller = require('../controllers/poll.controller')

route.post('/polls', controller.createPoll);
route.get('/polls/:techShotId', controller.getPollByTechShotId);
route.delete('/polls/:techShotId', controller.deletePollByTechShotId);

module.exports = route;