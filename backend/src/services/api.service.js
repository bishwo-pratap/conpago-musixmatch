const axios = require('axios');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const { setCacheData } = require('../utils/redis');
/**
 * constructs the qquery params for MusixMatch API
 * @param {Object} body
 * @return {String} 
 */
const bodyToQueryParams = (body) => {
  let queryString = `?apikey=${config.mm_api.key}`;
  Object.keys(body).forEach((key)=>{
    queryString += `&${key}=${body[key]}`
  })
  return queryString;
}

/**
 * Get top artists from user's country
 * @param {Object} req
 * @returns {Promise<Object>}
 */
const getArtists = async (req) => {
  try {
    const apiUrl = config.mm_api.url+'chart.artists.get';
    const queryString = bodyToQueryParams(req.body);
    const response = await axios.get(apiUrl+queryString+`&country=${req.user.country}`);
    const apiData = response.data.message.body;
    await setCacheData(`${req.user.country}_${req.body.page_size}_${req.body.page}`, apiData);
    return apiData;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message)
  }
};

/**
 * Get top artist's albums
 * @param {Object} req
 * @returns {Promise<Object>}
 */
const getArtistAlbums = async (req) => {
  try {
    const apiUrl = config.mm_api.url+'artist.albums.get';
    const queryString = bodyToQueryParams(req.body);
    const response = await axios.get(apiUrl+queryString);
    const apiData = response.data.message.body;
    await setCacheData(`artist_${req.body.artist_id}`, apiData);
    return apiData;
  } catch (error) {
    throw ApiError(httpStatus.BAD_REQUEST, error.message)
  }
 };

/**
 * Gets the album tracks
 * @param {Object} req
 * @returns {Promise<Object>}
 */
const getAlbumTracks = async (req) => {
  try {
    const apiUrl = config.mm_api.url+'album.tracks.get';
    const queryString = bodyToQueryParams(req.body);
    const response = await axios.get(apiUrl+queryString);
    const apiData = response.data.message.body;
    await setCacheData(`album_${req.body.album_id}_${req.body.page}_${req.body.page_size}`, apiData);
    return apiData;
  } catch (error) {
    throw ApiError(httpStatus.BAD_REQUEST, error.message)
  }
 };
 
/**
 * Gets the track lyrics
 * @param {Object} req
 * @returns {Promise<Object>}
 */
const getTrackLyrics = async (req) => {
  try {
    const apiUrl = config.mm_api.url+'track.lyrics.get';
    const queryString = bodyToQueryParams(req.body);
    const response = await axios.get(apiUrl+queryString);
    const apiData = response.data.message.body;
    await setCacheData(`lyrics_${req.body.track_id}`, apiData);
    return apiData;
  } catch (error) {
    throw ApiError(httpStatus.BAD_REQUEST, error.message)
  }
 }; 
 
module.exports = {
  getArtists,
  getArtistAlbums,
  getAlbumTracks,
  getTrackLyrics
};
