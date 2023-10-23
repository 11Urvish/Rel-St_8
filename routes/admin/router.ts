"use strict";

var express = require('express');
var router = express.Router();

require('./admin')(router);

module.exports = router;
