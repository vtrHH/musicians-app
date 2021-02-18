'use strict';

require('dotenv').config();

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const uploadMiddleware = require('./../middleware/file-upload');
const hbs = require('hbs');

router.get('/artist-search', routeGuard, (req, res) => {
  spotifyApi.searchArtists(req.query.q).then((data) => {
    res.render('spotify/artist-search-results', {
      artists: data.body.artists.items
    });
  });
});

router.get('/albums/:id', routeGuard, (req, res) => {
  spotifyApi.getArtistAlbums(req.params.id).then((data) => {
    res.render('spotify/albums', { albums: data.body.items });
  });
});

router.get('/tracks/:id', routeGuard, (req, res) => {
  spotifyApi.getAlbumTracks(req.params.id).then((data) => {
    res.render('spotify/tracks', { tracks: data.body.items });
  });
});

module.exports = router;
