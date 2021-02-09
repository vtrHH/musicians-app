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

module.exports = router;
