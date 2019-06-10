const jwt = require('jsonwebtoken');
const secret = require('../config').auth.secret;

module.exports = (req,res,next)=>{
    // if (req.path.includes('auth')|| req.path.includes('oauth')) 
    //     return next();

    // var token = req.headers.authorization;
    // jwt.verify(token, secret,(err, decoded)=>{
    //     if(err) return res.status(401).send({message: 'Erro de autenticação: token inválido', headers: req.headers, token});
    //     next();
    // });
}