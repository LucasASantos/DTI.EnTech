const route = require('express').Router();
const controller = require('../controllers/techshot.controller')

route.get('/techshot/:surveyId', controller.listTechshotBySurveyId);
route.get('/techshot/:id', controller.getTechshot);
route.post('/techshot', controller.createTechshot);
route.put('/techshot/:id', controller.updateTechshot);
route.delete('/techshot/:id', controller.deleteTechshot);


module.exports = route;