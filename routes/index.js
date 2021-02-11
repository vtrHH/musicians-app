'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');

const Offer = require('./../models/offer');

router.get('/', (req, res, next) => {
  Offer.find()
    .populate('creator')
    .sort({ creationDate: -1 })
    .then((offers) => {
      console.log(offers);
      res.render('home', { offers });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
