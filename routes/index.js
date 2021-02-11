'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');

const Offer = require('./../models/offer');

router.get('/', routeGuard, (req, res, next) => {
  Offer.find()
    .populate('creator')
    .then((offers) => {
      res.render('home', { offers });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
