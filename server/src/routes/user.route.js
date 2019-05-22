const route = require('express').Router();
const controller = require('../controllers/user.controller')

route.get('/users', controller.listUser);
route.get('/users/:id', controller.getUser);
route.post('/users', controller.createUser);
route.put('/users/:id', controller.updateUser);
route.delete('/users/:id', controller.deleteUser);

module.exports = route;