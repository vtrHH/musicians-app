'use strict';

require('dotenv').config();

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body['access_token']))
  .catch((error) =>
    console.log('Something went wrong when retrieving an access token', error)
  );


  router.get('/', routeGuard , (req, res) => {
        res.render('spotify/home');
  });
  
  router.get('/artist-search', routeGuard , (req, res) => {
    spotifyApi
      .searchArtists(req.query.q)
      .then((data) => {
        res.render('spotify/artist-search-results', { artists: data.body.artists.items });
      })
      .catch((error) => console.log(error));
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
