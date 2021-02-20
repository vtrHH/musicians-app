'use strict';

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
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

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
