const userRepository = require('../data/user.data');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config').auth.secret;

async function login(req, res){
    const {email, password} = req.body;
    
    const user = await userRepository.findOne({email}).select('+password');
    if (!user){
        return res.status(400).send('Usuário não encontrado.');
    }
    if(! await bcrypt.compare(password, user.password)){
        return res.status(400).send('Senha inválida');
    }
    
    user.password = undefined;

    res.json({user, token: generateToken(user)})
}

function generateToken(user){
    const token = jwt.sign({id: user._id}, secret,{
        expiresIn: 86400,
    })
    return token;

}

module.exports = {
    login,
    generateToken
}