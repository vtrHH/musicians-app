'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const uploadMiddleware = require('./../middleware/file-upload');

const Offer = require('./../models/offer');
const Comment = require('./../models/comment');

router.get('/create', routeGuard, (req, res, next) => {
  res.render('offer/create');
});

router.get('/my-offers', routeGuard, (req, res, next) => {
  res.render('offer/my-offers');
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
  let offer;
  Offer.findById(id)
    .populate('creator')
    .then((doc) => {
      offer = doc;
      if (offer === null) {
        const error = new Error('Offer does not exist.');
        next(error);
      } else {
        return Comment.find({ offer: id }).populate('creator');
      }
    })
    .then((comments) => {
      res.render('offer/single', {
        offer,
        comments
      });
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

router.post(
  '/:id/update',
  routeGuard,
  uploadMiddleware.single('image'),
  (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    let image;
    if (req.file) {
      image = req.file.path;
    }
    Offer.findByIdAndUpdate(id, {
      title: data.title,
      image: image,
      description: data.description,
      typeof: data.typeof,
      condition: data.condition,
      url: data.url
    })
      .then((offer) => {
        res.redirect(`/offer/${offer._id}`);
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.get('/:id/delete', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Offer.findById(id)
    .then((offer) => {
      res.render('offer/delete', { offer });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/delete', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Offer.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/comment', routeGuard, (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  Comment.create({
    message: data.message,
    creator: req.user._id,
    offer: id
  })
    .then(() => {
      res.redirect(`/offer/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
