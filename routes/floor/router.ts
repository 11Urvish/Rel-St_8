"use strict";

var express = require('express');
var router = express.Router();

require('./floor')(router);

module.exports = router;
