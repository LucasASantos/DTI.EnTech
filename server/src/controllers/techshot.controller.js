const jsonSchema = require('jsonschema');
const techsohtModel = require('../models/techshot.model');
const techshotRepository = require('../data/techshot.data');
const moment = require('moment');


async function createTechshot(req, res) {
    
    try {
        var techshot = req.body;
    
        validateSchema(techshot, techsohtModel);
        
        await techshotRepository.create(techshot);
    
        res.status(200).send('Techshot criado com sucesso!');
        
    } catch (err) {
        res.status(400).send('Erro ao cadastrar techshot')
    }
}

async function listTechshotBySurveyId(req,res) {
    try{
        var dados = await techshotRepository.find({
            "surveyId": req.params.surveyId,
        });
        res.json(dados);
    }catch(err){
        console.log(err);
        res.status (400).send (err.message);
    }
}

async function getTechshot(req,res) {
    try{
        var dados = await techshotRepository.findById(req.params.id);
        res.json(dados);
    }catch(err){
        if(err.name == 'CastError'){
            res.status(404).send('Techshot não encontrado')
        }
        res.status (400).send (err.message);
    }
}

async function updateTechshot(req,res) {
    try {
        var techshot = req.body;

        validateSchema(techshot, techsohtModel);

        await techshotRepository.updateOne({"_id": req.params.id}, techshot);

        res.status(200).send("Techshot alterdo com sucesso");
        
    } catch (err) {
        if(err.name == 'CastError'){
            res.status(404).send('Techshot não encontrado');
        }
        res.status (400).send (err.message);
    }
}

async function deleteTechshot(req, res){
    try {
        await techshotRepository.deleteOne({"_id": req.params.id});

        res.status(200).send('Techshot deletado com sucesso');
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

module.exports = {
    createTechshot,
    listTechshotBySurveyId,
    getTechshot,
    updateTechshot,
    deleteTechshot
}