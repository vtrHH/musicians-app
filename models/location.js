'use strict';

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    location: {
      coordinates: [
        {
          type: Number,
          min: -180,
          max: 180
        }
      ],
      type: {
        type: String,
        default: 'Point',
        required: true
      }
    },
    name: {
      type: String,
      required: true
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 4
    },
    message: {
      type: String
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

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
