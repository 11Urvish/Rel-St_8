"use strict";

var express = require('express');
var router = express.Router();

require('./camera_floor')(router);

module.exports = router;
