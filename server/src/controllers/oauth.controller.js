const axios = require('axios');


function redirectOauthMeetup(req, res) {

    var url = `https://secure.meetup.com/oauth2/authorize?client_id=20f5jmau76qqdo53cuo8tgohl3&response_type=code&redirect_uri=http://localhost:8000/oauth`

    res.redirect(url);
}

async function getAccessByUserCode(req, res) {
    console.log(req.query.code);

    var url = `https://secure.meetup.com/oauth2/access?client_id=20f5jmau76qqdo53cuo8tgohl3&client_secret=qi2l4fnl173scn5jcrleffouqr&grant_type=authorization_code&redirect_uri=http://localhost:8000/oauth&code=${req.query.code}`
    var autorization;
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
        }).then((resp2) => {
            console.log(resp2.data)
            res.send(`<img src="${resp2.data.photo.photo_link}">`)
        })
    });



}

module.exports = {
    redirectOauthMeetup,
    getAccessByUserCode
}