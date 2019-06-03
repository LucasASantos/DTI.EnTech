const route = require('express').Router();
const controller = require('../controllers/poll.controller')

route.post('/techshots/polls', controller.createPoll);
route.get('/techshots/:techshotid/polls', controller.getPollByTechShotId);
route.delete('/techshots/:techshotid/polls', controller.deletePollByTechShotId);

module.exports = route;