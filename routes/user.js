'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const uploadMiddleware = require('./../middleware/file-upload');

const User = require('./../models/user');
const Offer = require('./../models/offer');

router.get('/:id', routeGuard, (req, res, next) => {
  res.render('user/single');
});

router.get('/:id/update', routeGuard, (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.render('user/update', { user: user });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/update', routeGuard, (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  User.findByIdAndUpdate(
    id,
    {
      description: data.description,
      skills: data.skills,
      interests: data.interests,
      experience: data.experience,
      url: data.url
    },
    { new: true, returnOriginal: true }
  )
    .then((user) => {
      res.redirect(`/user/${user._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/update/picture', routeGuard, (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.render('user/update-picture', { user: user });
    })
    .catch((error) => {
      next(error);
    });
});

router.post(
  '/:id/update/picture',
  routeGuard,
  uploadMiddleware.single('image'),
  (req, res, next) => {
    const id = req.params.id;
    let image;
    if (req.file) {
      image = req.file.path;
    }
    User.findByIdAndUpdate(id, {
      image: image
    })
      .then((user) => {
        res.redirect(`/user/${user._id}`);
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.get('/:id/my-offers', (req, res, next) => {
  const id = req.params.id;
  let user;
  User.findById(id)
    .then((doc) => {
      user = doc;
      if (!user) {
        next(createError(404));
      } else {
        return Offer.find({ creator: id })
          .populate('creator')
          .sort({ creationDate: -1 });
      }
    })
    .then((offers) => {
      res.render('user/my-offers', { user: user, offers });
    })
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        next(createError(404));
      } else {
        next(error);
      }
    });
});

module.exports = router;
