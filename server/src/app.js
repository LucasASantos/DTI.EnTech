const express = require('express');
const bodyparser = require('body-parser');
const path = require('path').join(__dirname, 'middlewares')
const mongoose = require('mongoose')

class Startup {
    constructor() {
        this.express = express();

        this.connectDatabase();

        this.middlewares();
        this.routes();
    }
    connectDatabase() {
        mongoose.connect('mongodb+srv://entechapi:oVYXzsQvxJ22Znwn@cluster0-0v7e8.azure.mongodb.net/entech?retryWrites=true', { useNewUrlParser: true });
        mongoose.set('useCreateIndex', true);
    }


    middlewares() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({
            extended: false
        }))
        this.express.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });
        this.requireArchives('middlewares', this.express);
    }

    routes() {
        this.requireArchives('routes', this.express);
    }

    requireArchives(pasta, app) {
        require("fs").readdirSync(require('path').join(__dirname, pasta)).forEach(function (file) {
            app.use(require('./' + pasta + '/' + file.replace('.js', "")))
        });
    }
}

module.exports = new Startup().express;