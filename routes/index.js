'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');

const Offer = require('./../models/offer');

router.get('/', (req, res, next) => {
  const page = Number(req.query.page) || 1;

  const limit = 3;
  const skip = (page - 1) * limit;

  Offer.find()
    .skip(skip)
    .limit(limit)
    .populate('creator')
    .sort({ creationDate: -1 })
    .then((offers) => {
      res.render('landing-page', {
        offers,
        previousPage: page - 1,
        nextPage: offers.length ? page + 1 : 0
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/home', routeGuard, (req, res, next) => {
  const page = Number(req.query.page) || 1;

  const limit = 3;
  const skip = (page - 1) * limit;

  Offer.find()
    .skip(skip)
    .limit(limit)
    .populate('creator')
    .sort({ creationDate: -1 })
    .then((offers) => {
      res.render('home', {
        offers,
        previousPage: page - 1,
        nextPage: offers.length ? page + 1 : 0
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
