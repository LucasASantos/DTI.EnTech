const jsonSchema = require('jsonschema');
const userModel = require('../models/user.model');
const userRepository = require('../data/user.data');
const moment = require('moment');


async function createUser(req, res) {

    try {
        var user = req.body;

        validateSchema(user, userModel);

        user = formatDateUser(user);

        await userRepository.create(user);

        res.status(200).send('Usuário criado com sucesso!');

    } catch (err) {
        res.status(400).send('Erro ao cadastrar usuário')
    }
}

async function listUser(req, res) {
    try {
        var dados = await userRepository.find({});
        res.json(dados);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
}

async function getUser(req, res) {
    try {
        var dados = await userRepository.findById(req.params.id);
        res.json(dados);
    } catch (err) {
        if (err.name == 'CastError') {
            res.status(404).send('Usuário não encontrado')
        }
        res.status(400).send(err.message);
    }
}

async function updateUser(req, res) {
    try {
        var user = req.body;

        validateSchema(user, userModel);

        user = formatDateUser(user);

        await userRepository.update({ "_id": req.params.id }, user)

        res.status(200).send("Usuário alterado com sucesso")

    } catch (err) {
        if (err.name == 'CastError') {
            res.status(404).send('Usuário não encontrado')
        }
        res.status(400).send(err.message);
    }
}

async function deleteUser(req, res) {
    try {
        await userRepository.deleteOne({ "_id": req.params.id });

        res.status(200).send('Usuário deletado com sucesso');
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
    createUser: createUser,
    listUser: listUser,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}