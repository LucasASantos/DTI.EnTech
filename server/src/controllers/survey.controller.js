const jsonSchema = require('jsonschema');
const surveyModel = require('../models/survey.model');
const surveyRepository = require('../data/survey.data');
const moment = require('moment');


async function createSurvey(req, res) {
    
    try {
        var survey = req.body;
    
        validateSchema(survey, surveyModel);
        survey.process = false

        survey = formatDateSurvey(survey);
        
        await surveyRepository.create(survey);
    
        res.status(200).send('Enquete criada com sucesso!');
        
    } catch (err) {
        res.status(400).send('Erro ao cadastrar enquete')
    }
}

async function listSurveys(req,res) {
    try{
        var dados = await surveyRepository.find({
<<<<<<< HEAD
            process: false
=======
            //process: false
>>>>>>> 3ba8c54066e06292796c9e8dc7039dea052782e7
        });
        res.json(dados);
    }catch(err){
        console.log(err);
        res.status (400).send (err.message);
    }
}

async function getSurvey(req,res) {
    try{
        var dados = await surveyRepository.findById(req.params.id);
        res.json(dados);
    }catch(err){
        if(err.name == 'CastError'){
            res.status(404).send('Enquete não encontrada')
        }
        res.status (400).send (err.message);
    }
}

async function updateSurvey(req,res) {
    try {
        var survey = req.body;

        validateSchema(survey, surveyModel);

        survey = formatDateSurvey(survey);

        await surveyRepository.updateOne({"_id": req.params.id}, survey)

        res.status(200).send("Enquete alterda com sucesso")
        
    } catch (err) {
        if(err.name == 'CastError'){
            res.status(404).send('Enquete não encontrada')
        }
        res.status (400).send (err.message);
    }
}

async function deleteSurvey(req, res){
    try {
        await surveyRepository.deleteOne({"_id": req.params.id});

        res.status(200).send('Enquete deletada com sucesso');
    } catch (err) {
        res.status (400).send (err.message);
    }
}

function validateSchema(obj, model){
    var result = jsonSchema.validate (obj, model);

    if (result.errors.length > 0) {
        res.status(400).send('Erro no formato do objeto JSON');
    }
}
function formatDateSurvey(survey){
    survey.startTime = moment.utc(survey.startTime).toDate();
    survey.endTime = moment.utc(survey.endTime).toDate();
    return survey;
}


module.exports = {
    createSurvey,
    listSurveys,
    getSurvey,
    updateSurvey,
    deleteSurvey
}