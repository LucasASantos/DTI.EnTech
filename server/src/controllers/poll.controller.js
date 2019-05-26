const jsonSchema = require('jsonschema');
const pollModel = require('../models/poll.model');
const pollRepository = require('../data/poll.data');
const moment = require('moment');

async function createPoll(req, res) {
    
    try {
        var poll = req.body;
    
        validateSchema(poll, pollModel);
        
        await pollRepository.create(poll);
    
        res.status(200).send('Voto computado com sucesso!');
        
    } catch (err) {
        res.status(400).send('Erro ao computar voto')
    }
}

async function getPollByTechShotId(req, res) {
    try {
        var dados = await pollRepository.findById({"techShotId": req.params.techShotId});
        res.json(dados);
    } catch (err) {
        if (err.name == 'CastError') {
            res.status(404).send('Votação não encontrada')
        }
        res.status(400).send(err.message);
    }
}

async function deletePollByTechShotId(req, res){
    try {
        await pollRepository.deleteOne({"techShotId": req.params.techShotId});

        res.status(200).send('Voto deletado com sucesso');
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

    createPoll,
    getPollByTechShotId,
    deletePollByTechShotId
}