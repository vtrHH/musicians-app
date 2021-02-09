'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const uploadMiddleware = require('./../middleware/file-upload');

const Offer = require('./../models/offer');

router.get(
  '/',
  routeGuard,
  (req, res, next) => {
    Offer.find()
      .then((offers) => {
        res.render('home', { offers });
      })
      .catch((error) => {
        next(error);
      });
  }
);

module.exports = router;
