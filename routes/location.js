'use strict';

const Location = require('./../models/location');
const User = require('./../models/user');

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', routeGuard, (req, res, next) => {
  Location.find().then((locations) => {
    res.render('location/overview', { locations });
  });
});

router.post('/', routeGuard, (req, res, next) => {
  const data = req.body;
  Location.create({
    name: data.name,
    location: {
      coordinates: [data.longitude, data.latitude]
    },
    rating: data.rating,
    message: data.message,
    creator: req.user._id
  })
    .then((location) => {
      res.redirect('/location');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
