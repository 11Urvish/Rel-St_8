"use strict";

import bodyParser from "body-parser";
import cors from 'cors';
import express from "express";
import fs from "fs";
import i18n from "i18n";
import { resolve } from "path";
const swaggerUi = require('swagger-ui-express');

const app = express();

//Cors Policy
var corsOptions = {
  origin: "http://localhost:7777"
};

app.use( express.static( "public" ) );
app.use(cors(corsOptions));

// Load envs from .env file
if (fs.existsSync("./.env")) {
  require("dotenv").config();
}

import common from './helpers/common';
const { validateApiKey } = new common();

import * as swaggerDefinition from './swagger/config';

// Localization setup
i18n.configure({
  locales: ["en"],
  directory: resolve(__dirname, "../locales"),
  defaultLocale: "en",
  queryParameter: "lang",
  objectNotation: true
});
app.use(i18n.init);
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send("Welcome to My Teksun ");
});

// initialize swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDefinition);
});

let allowCrossDomain = function (req, res, next) {
  if ("OPTIONS" === req.method) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    res.send(200);
  } else {
    next();
  }
};


app.use(allowCrossDomain);

var AllRouter = require('./routes/v1');

app.use('/api', AllRouter);

module.exports = app;
