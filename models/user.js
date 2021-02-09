'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  image: {
    type: String
  },
  description: {
    type: String
    //required: true
  },
  skills: [
    {
      type: String,
      enum: [
        'Piano',
        'Drums',
        'Electric_Guitar',
        'Classical_Guitar',
        'Bass_Guitar',
        'Singing',
        'Keyboard',
        'Saxophone',
        'Trumpet',
        'Violin',
        'Cello',
        'Clarinet',
        'Harp',
        'Songwriting',
        'DJ'
      ]
    }
  ],
  experience: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Pro']
  },
  url: {
    type: String
  },
  passwordHashAndSalt: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
