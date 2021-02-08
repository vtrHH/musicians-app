'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const uploadMiddleware = require('./../middleware/file-upload');

const User = require('./../models/user');

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

router.get('/update', routeGuard, (req, res, next) => {
  res.render('profile/update');
});



module.exports = router;
