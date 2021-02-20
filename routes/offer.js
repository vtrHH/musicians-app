'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const uploadMiddleware = require('./../middleware/file-upload');
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');

const Offer = require('./../models/offer');
const User = require('./../models/user');
const Comment = require('./../models/comment');

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

router.get('/events', routeGuard, (req, res, next) => {
  Offer.find({ typeof: 'Event' })
    .populate('creator')
    .sort({ creationDate: -1 })
    .then((offers) => {
      res.render('offer/events-overview', { offers });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/marketplace', routeGuard, (req, res, next) => {
  Offer.find({ typeof: 'Item' })
    .populate('creator')
    .sort({ creationDate: -1 })
    .then((offers) => {
      res.render('offer/items-overview', { offers });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/services', routeGuard, (req, res, next) => {
  Offer.find({ typeof: 'Service' })
    .populate('creator')
    .sort({ creationDate: -1 })
    .then((offers) => {
      res.render('offer/services-overview', { offers });
    })
    .catch((error) => {
      next(error);
    });
});

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
        subtitle: offer.title,
        authenticatedUserIsOwner:
          req.user && req.user._id.toString() === offer.creator._id.toString(),
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

router.get('/:id/send-email', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Offer.findById(id)
    .populate('creator')
    .then((offer) => {
      res.render('offer/contactform', { offer });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/send-email', (req, res, next) => {
  let { email, subject, message } = req.body;
  const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mooseicians@gmail.com',
      pass: 'Malta123!'
    }
  });
  transport
    .sendMail({
      from: 'mooseicians@gmail.com',
      to: email,
      subject: subject,
      text: message,
      html: `<b>${message}</b>`
    })
    .then((info) =>
      res.render('offer/message', { email, subject, message, info })
    )
    .catch((error) => console.log(error));
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
      res.redirect('/home');
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
