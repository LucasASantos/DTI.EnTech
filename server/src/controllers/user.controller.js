const jsonSchema = require('jsonschema');
const userModel = require('../models/user.model');
const userRepository = require('../data/user.data');
const authController = require('./auth.controller')
const moment = require('moment');

async function registerUser(req, res) {

    try {
        var user = req.body;

        if (await userRepository.findOne({ "email": user.email }))
            return res.status(400).send('Usuário já cadastrado com esse e-mail.');

        user = await createNewUser(user);

        res.status(200).send({ message: 'Usuário criado com sucesso!', user, token: authController.generateToken(user) });

    } catch (err) {
        res.status(400).send('Erro ao cadastrar usuário');
    }
}

async function createNewUser(user) {
    
    validateSchema(user, userModel);

    await userRepository.create(user);

    user = await userRepository.findOne({ email: user.email });

    user.password = undefined;

    return user;
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
    registerUser,
    listUser,
    getUser,
    updateUser,
    deleteUser,
    createNewUser
}