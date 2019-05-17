const route = require('express').Router();
const {criateSurvey} = require('../controllers/survey.controller')

route.get('/surveys', (req,res)=>{res.send('ok')});
route.post('/surveys', criateSurvey), 





module.exports = route;