const axios = require('axios');
const userRepository = require('../data/user.data');
const userController = require('./user.controller');
const authController = require('./auth.controller');

function redirectOauthMeetup(req, res) {
    var url = `https://secure.meetup.com/oauth2/authorize?client_id=20f5jmau76qqdo53cuo8tgohl3&response_type=code&redirect_uri=http://localhost:3000/oauth`

    res.redirect(url);
}

async function getAccessByUserCode(req, res) {
    var url = `https://secure.meetup.com/oauth2/access?client_id=20f5jmau76qqdo53cuo8tgohl3&client_secret=qi2l4fnl173scn5jcrleffouqr&grant_type=authorization_code&redirect_uri=http://localhost:3000/oauth&code=${req.query.code}`
    axios({
        method: 'post',
        url,
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        axios({
            method: 'get',
            url: 'https://api.meetup.com/members/self',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${response.data.access_token}`
            }
        }).then(async (userResponse) => {
            userResponse = userResponse.data;
            var user = await userRepository.findOne({ "email": userResponse.email });
            if (!user) {
                console.log(userResponse);

                user = await userController.createNewUser({
                    name: userRepository.name,
                    email: userResponse.email,
                    status: userResponse.status,
                    photoURL: userResponse.photo.photo_link,
                    refenceId: userResponse.id,
                    metodLogin: 'Meetup'
                });
            }
            
            if (user.refenceId != userResponse.id) {
                 res.status(400).send('Falha na autenticação ');
            }

            res.redirect().json({ user, token: authController.generateToken(user) })
        })
    });
}

async function registerUser(userResponse) {
    console.log(userResponse);

    var user = await userController.createNewUser({
        name: userRepository.name,
        email: userResponse.email,
        status: userResponse.status,
        photoURL: userResponse.photo.photo_link,
        refenceId: userResponse.id,
        metodLogin: "Meetup",
        type: "Adm"
    });

    return res.json({ user, token: authController.generateToken(user) });
}

async function authenicateUser(user, userResponse) {
    if (user.method != "Meetup" || user.refenceId != userResponse.Id) {
        return res.status(400).send('Falha na autenticação ');
    }

    return res.json({ user, token: authController.generateToken(user) })
}

module.exports = {
    redirectOauthMeetup,
    getAccessByUserCode
}