'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', routeGuard, (req, res, next) => {
  res.render('location/overview');
});

module.exports = router;
