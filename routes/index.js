'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');

const Offer = require('./../models/offer');

router.get('/', (req, res, next) => {
  Offer.find()
    .then((offers) => {
      res.render('home', { offers });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
