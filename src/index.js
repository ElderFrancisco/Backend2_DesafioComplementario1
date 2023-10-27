const express = require('express');
const http = require('http');
const routes = require('./routes');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const utilSocket = require('./util/socket');
const mongoose = require('mongoose');
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.settings();
    this.routes();
    this.server = http.createServer(this.app);
    this.utilSocket();
    this.connect();
  }

  settings() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.engine('handlebars', exphbs.engine());
    this.app.set('view engine', 'handlebars');
    this.app.set('views', __dirname + '/views');
    this.app.use(express.static(__dirname + 'public'));
  }

  connect() {
    mongoose
      .connect(process.env.MONGO_URL, { dbName: 'ecommerce' })
      .then(() => {
        console.log('db connected');
      })
      .catch((e) => {
        console.log('error' + e);
      });
  }

  routes() {
    routes(this.app);
  }

  utilSocket() {
    utilSocket(this.server);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`http://localhost:${this.port}`);
    });
  }
}

module.exports = new Server();
