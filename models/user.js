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
    type: String,
    //required: true
  },
  skills: {
    type: String,
    //required: true
  },
  experience: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'pro']
  },
  passwordHashAndSalt: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
