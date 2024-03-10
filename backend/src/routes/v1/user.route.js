const express = require('express');
const auth = require('../../middlewares/auth');
const { validate, validateToken } = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/top-artists')
  .post(auth('topArtists'), validate(userValidation.topArtists), validateToken, userController.getTopArtists)

router
  .route('/artist-albums')
  .post(auth('artistAlbums'), validate(userValidation.artistAlbums), validateToken, userController.getArtistAlbums)

router
  .route('/album-tracks')
  .post(auth('albumTracks'), validate(userValidation.albumTracks), validateToken, userController.getAlbumTracks)

router
  .route('/track-lyrics')
  .post(auth('trackLyrics'), validate(userValidation.trackLyrics), validateToken, userController.getTrackLyrics)


module.exports = router;

/**
 * @swagger
 * tags:
 *   name: MusixMatch
 *   description: Authenticated Routes. <b>AUTHORIZE BEFORE EXECUTING</b> api to get MusixMatch data based on user's set country, atrists, albums and tracks
 */

/**
 * @swagger
 * /user/top-artists:
 *   post:
 *     summary: Top artists in the User's country
 *     description: Fetch data over MusixMatch API or redis and give the list of top trending artists in user's country.
 *     tags: [MusixMatch]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - page
 *               - page_size
 *             properties:
 *               page:
 *                 type: number
 *               page_size:
 *                 type: number
 *             example:
 *               page: 1
 *               page_size: 3
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/TopArtists'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /user/artist-albums:
 *   post:
 *     summary: Get recent albums of artist in the recent years.
 *     description: Fetch data over MusixMatch API or redis and give the list recent albums of artists in the recent years.
 *     tags: [MusixMatch]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - page
 *               - page_size
 *               - s_release_date
 *               - artist_id
 *               - g_album_name
 *             properties:
 *               page:
 *                 type: number
 *               page_size:
 *                 type: number
 *               s_release_date:
 *                 type: string
 *               artist_id:
 *                 type: number
 *               g_album_name:
 *                 type: number
 *             example:
 *               page: 1
 *               page_size: 3
 *               s_release_date: desc
 *               artist_id: 259675
 *               g_album_name: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ArtistAlbums'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /user/albums-tracks:
 *   post:
 *     summary: Get list of tracks for the album.
 *     description: Fetch data over MusixMatch API or redis and give the list of tracks in the given album_id.
 *     tags: [MusixMatch]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - page
 *               - page_size
 *               - album_id
 *               - f_has_lyrics
 *             properties:
 *               page:
 *                 type: number
 *               page_size:
 *                 type: number
 *               album_id:
 *                 type: number
 *               f_has_lyrics:
 *                 type: boolean
 *             example:
 *               page: 1
 *               page_size: 3
 *               album_id: 60157928
 *               f_has_lyrics: false
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/AlbumTracks'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /user/track-lyrics:
 *   post:
 *     summary: Get lyrics for the track.
 *     description: Fetch data over MusixMatch API or redis and give the lyrics of the track in the given track_id.
 *     tags: [MusixMatch]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - track_id
 *             properties:
 *               track_id:
 *                 type: number
 *             example:
 *               track_id: 267619808
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/TrackLyrics'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */
