const route = require('express').Router();
const controller = require('../controllers/techshot.controller')

route.get('/surveys/:surveyId/techshots', controller.listTechshotBySurveyId);
route.get('/techshots/:id', controller.getTechshot);
route.post('/techshots', controller.createTechshot);
route.put('/techshots/:id', controller.updateTechshot);
route.delete('/techshots/:id', controller.deleteTechshot);


module.exports = route;