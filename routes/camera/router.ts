"use strict";

var express = require('express');
var router = express.Router();

require('./camera')(router);

module.exports = router;
