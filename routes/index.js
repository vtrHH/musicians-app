'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const uploadMiddleware = require('./../middleware/file-upload');

const Offer = require('./../models/offer');

router.get(
  '/',
  routeGuard,
  uploadMiddleware.single('image'),
  (req, res, next) => {
    let image;
    if (req.file) {
      image = req.file.path;
    }
    Offer.find()
      .then((offers) => {
        res.render('home', { offers, image });
      })
      .catch((error) => {
        next(error);
      });
  }
);

module.exports = router;
