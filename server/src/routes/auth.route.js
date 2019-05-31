const route = require('express').Router();
const oauthController = require('../controllers/oauth.controller');

route.get("/oauth/meetup", oauthController.redirectOauthMeetup);

route.get("/oauth", oauthController.getAccessByUserCode)

module.exports = route;