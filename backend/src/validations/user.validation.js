const Joi = require('joi');

const topArtists = {
  body: Joi.object().keys({
    page_size: Joi.number().integer().required(),
    page: Joi.number().integer().required(),
  }),
};

const artistAlbums = {
  body: Joi.object().keys({
    page: Joi.number().integer().required(),
    page_size: Joi.number().integer().required(),
    s_release_date: Joi.string().default('desc'),
    artist_id: Joi.number().integer().required(),
    g_album_name: Joi.number().integer().default(1),
  })
}

const albumTracks = {
  body: Joi.object().keys({
    page: Joi.number().integer().required(),
    page_size: Joi.number().integer().required(),
    album_id:  Joi.number().integer().required(),
    f_has_lyrics:  Joi.boolean().default(true),
  })
}

const trackLyrics = {
  body: Joi.object().keys({
    track_id:  Joi.number().integer().required()
  })
}

module.exports = {
  topArtists,
  artistAlbums,
  albumTracks,
  trackLyrics
};
