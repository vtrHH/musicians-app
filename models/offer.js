'use strict';

const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  typeof: {
    type: String,
    enum: ['service', 'event', 'item'],
    required: true
  },
  condition: {
    type: String,
    enum: ['new', 'used', 'heavily used']
  },
  url: {
    type: String
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;