const route = require('express').Router();
const oauthController = require('../controllers/oauth.controller');
const authContorller = require('../controllers/auth.controller');

route.get("/oauth/meetup", oauthController.redirectOauthMeetup);

route.get("/oauth", oauthController.getAccessByUserCode)

route.post("/auth/login",authContorller.login)


module.exports = route;