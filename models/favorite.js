'use strict';

const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
      },
    id: {
      type: String,
    },
    name: {
        type: String,
    },
    favoriteTrackImage: {
        type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
