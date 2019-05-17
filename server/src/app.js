const express = require('express');
const bodyparser = require('body-parser');
const path = require('path').join(__dirname, 'middlewares')

class Startup {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({
            extended: false
        }))
        this.requireArchives('middlewares', this.express);
    }

    routes() {
        this.requireArchives('routes', this.express);
    }

    requireArchives(pasta, app) {
        require("fs").readdirSync(require('path').join(__dirname, pasta)).forEach(function (file) {
            app.use(require('./' + pasta + '/' + file.replace('.js',"")))
        });
    }
}

module.exports = new Startup().express;