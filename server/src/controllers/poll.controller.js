const jsonSchema = require('jsonschema');
const pollModel = require('../models/poll.model');
const pollRepository = require('../data/poll.data');
const techshotRepository = require('../data/techshot.data');
const surveyRepository = require('../data/survey.data');



async function createPoll(req, res) {

    try {
        var poll = req.body;

        validateSchema(poll, pollModel);

        var pollBd = await pollRepository.findOne({
            userId: poll.userId,
            techShotId: poll.techShotId
        });

        if (pollBd) {
            await pollRepository.deleteOne({
                _id: pollBd._id
            });
            return res.status(200).send('Voto descomputado com sucesso!');
        }

        var techShot = await techshotRepository.findById(poll.techShotId);
        if (!(techShot && await CanPoll(poll, techShot))) {
            return res.status(400).send(`Erro ao computar voto`)
        }

        await pollRepository.create(poll);

        return res.status(200).send('Voto computado com sucesso!');

    } catch (err) {
        return res.status(400).send('Erro ao computar voto')
    }
}

async function CanPoll(poll, techShot) {
    var survey = await surveyRepository.findById(techShot.surveyId);
    var listTechShot = await techshotRepository.find({
        surveyId: survey._id
    });

    var countUserPolls = 0;

    for (let i = 0; i < listTechShot.length; i++) {
        const ts = listTechShot[i];
        var polls = await pollRepository.find({
            techShotId: ts._id,
            userId: poll.userId
        });
        countUserPolls += polls.length;
    }


    return countUserPolls < survey.numberWinners
}

async function getPollByTechShotId(req, res) {
    try {
        var dados = await pollRepository.find({
            "techShotId": req.params.techshotid
        });
        res.json(dados);
    } catch (err) {
        if (err.name == 'CastError') {
            res.status(404).send('Votação não encontrada')
        }
        res.status(400).send(err.message);
    }
}

async function deletePollByTechShotId(req, res) {
    try {
        var poll = req.body;

        validateSchema(poll, pollModel);

        await pollRepository.deleteOne({
            "techShotId": poll.techShotId,
            "userId": poll.userId
        });

        res.status(200).send('Voto deletado com sucesso');
    } catch (err) {
        res.status(400).send(err.message);
    }
}

function validateSchema(obj, model) {
    var result = jsonSchema.validate(obj, model);

    if (result.errors.length > 0) {
        res.status(400).send('Erro no formato do objeto JSON');
    }
}

module.exports = {
    createPoll,
    getPollByTechShotId,
    deletePollByTechShotId,
}