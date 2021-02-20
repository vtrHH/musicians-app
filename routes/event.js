'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('../middleware/route-guard');
const uploadMiddleware = require('../middleware/file-upload');
const dotenv = require('dotenv');
dotenv.config();

const Event = require('../models/event');
const User = require('../models/user');
const Comment = require('../models/comment');

router.get('/', routeGuard, (req, res, next) => {
  Event.find()
    .populate('creator')
    .sort({ creationDate: -1 })
    .then((events) => {
      res.render('event/events-overview', { events });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/create', routeGuard, (req, res, next) => {
  res.render('event/create');
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
    Event.create({
      title: data.title,
      image: image,
      description: data.description,
      url: data.url,
      creator: req.user._id
    })
      .then((event) => {
        res.redirect(`/event/${event._id}`);
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.get('/:id', routeGuard, (req, res, next) => {
  const id = req.params.id;
  let event;
  Event.findById(id)
    .populate('creator')
    .then((doc) => {
      event = doc;
      if (event === null) {
        const error = new Error('Event does not exist.');
        next(error);
      } else {
        return Comment.find({ event: id }).populate('creator');
      }
    })
    .then((comments) => {
      res.render('event/single', {
        event,
        subtitle: event.title,
        authenticatedUserIsOwner:
          req.user && req.user._id.toString() === event.creator._id.toString(),
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
  Event.findById(id)
    .then((event) => {
      console.log(event);
      res.render('event/update', { event: event });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/update', routeGuard, (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  Event.findByIdAndUpdate(
    id,
    {
      title: data.title,
      description: data.description,
      url: data.url
    },
    { new: true, returnOriginal: true }
  )
    .then((event) => {
      console.log(event);
      res.redirect(`/event/${event._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/delete', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Event.findById(id)
    .then((event) => {
      res.render('event/delete', { event });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/delete', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Event.findByIdAndDelete(id)
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
    event: id
  })
    .then(() => {
      res.redirect(`/event/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
