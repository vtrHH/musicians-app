'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const uploadMiddleware = require('./../middleware/file-upload');

const Offer = require('./../models/offer');

router.get('/create', routeGuard, (req, res, next) => {
  res.render('offer/create');
});

router.post(
  '/create',
  routeGuard,
  uploadMiddleware.single('image'),
  (req, res, next) => {
    const data = req.body;
    let image;
    if (req.file) {
      image = req.file.path;
    }
    Offer.create({
      title: data.title,
      image: image,
      description: data.description,
      typeof: data.typeof,
      condition: data.condition,
      url: data.url,
      creator: req.user._id
    })
      .then((offer) => {
        res.redirect(`/offer/${offer._id}`);
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.get('/:id', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Offer.findById(id)
    .then((offer) => {
      if (offer === null) {
        const error = new Error('Offer does not exist.');
        next(error);
      } else {
        res.render('offer/single', { offer });
      }
    })
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        error.status = 404;
      }
      next(error);
    });
});

router.get('/:id/update', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Offer.findById(id)
    .then((offer) => {
      res.render('offer/update', { offer });
    })
    .catch((error) => {
      next(error);
    });
});


/*router.post('/:id/update', routeGuardMiddleware, (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    Resource.findByIdAndUpdate(id, {
      title: data.title,
      url: data.url,
      difficulty: data.difficulty,
      image: data.image || undefined
    })
      .then(resource => {
        res.redirect(`/resource/${resource._id}`);
      })
      .catch(error => {
        next(error);
      });
  });*/

module.exports = router;