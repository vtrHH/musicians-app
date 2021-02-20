'use strict';

const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
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
      enum: ['Service', 'Event', 'Item'],
      required: true
    },
    condition: {
      type: String,
      enum: ['new', 'used', 'heavily used'],
      required: true
    },
    url: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: 'true'
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
