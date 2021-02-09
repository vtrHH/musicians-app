'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const uploadMiddleware = require('./../middleware/file-upload');

const User = require('./../models/user');

router.get('/:id', routeGuard, (req, res, next) => {
  res.render('user/single');
});

router.get('/:id/update', routeGuard, (req, res, next) => {
  res.render('user/update');
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

    User.findByIdAndUpdate(id, {
      image: image,
      description: data.description,
      experience: data.experience,
      skills: data.skills,
      url: data.url
    })
      .then((user) => {
        res.redirect(`/user/${user._id}`);
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.get('/user/:id/my-offers', (req, res, next) => {
Offer.find()
    .populate('creator')
    .then((offers) => {
      res.render('my-offers', {
        offers
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/user/:id/my-offers', (req, res, next) => {
  const id = req.params.id;
  let user;
  User.findById(id)
    .then((doc) => {
      user = doc;
      if (!user) {
        next(createError(404));
      } else {
        return Offer.find({ creator: id }).populate('creator');
      }
    })
    .then((offers) => {
      res.render('my-offers', { user: user, offers  });
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
