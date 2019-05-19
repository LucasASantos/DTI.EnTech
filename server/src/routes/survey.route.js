const route = require('express').Router();
const controller = require('../controllers/survey.controller')

route.get('/surveys', controller.listSurveys);
route.get('/surveys/:id', controller.getSurvey);
route.post('/surveys', controller.criateSurvey);
route.put('/surveys/:id', controller.updateSurvey);
route.delete('/surveys/:id', controller.deleteSurvey);


module.exports = route;