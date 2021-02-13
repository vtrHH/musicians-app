'use strict';

const { Router } = require('express');
const bcryptjs = require('bcryptjs');
const uploadMiddleware = require('./../middleware/file-upload');
const User = require('./../models/user');

const router = new Router();

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', uploadMiddleware.single('image'), (req, res, next) => {
  const {
    name,
    email,
    description,
    skills,
    interests,
    experience,
    password
  } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      let image;
      if (req.file) {
        image = req.file.path;
      }
      return User.create({
        name,
        email,
        description,
        skills,
        interests,
        experience,
        passwordHashAndSalt: hash,
        image
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      res.redirect(`/user/${user._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        res.redirect(`/home`);
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
