const catchAsync = require('../utils/catchAsync');
const { mmApiService } = require('../services');
const { getCacheData } = require('../middlewares/redis');

const getTopArtists = catchAsync(async (req, res) => {
  const redisData = await getCacheData(
    `${req.user.country}_${req.body.page_size}_${req.body.page}`
  );
  if(redisData){
    return res.send({ data: redisData})
  } 
  const data = await mmApiService.getArtists(req);
  res.send({ data });
});

const getArtistAlbums = catchAsync(async (req, res) => {
  const redisData = await getCacheData(`artist_${req.body.artist_id}`);
  if(redisData){
    return res.send({ data: redisData})
  } 
  const data = await mmApiService.getArtistAlbums(req)
  res.send({ data });
})

const getAlbumTracks = catchAsync(async (req, res) => {
  const redisData = await getCacheData(
    `album_${req.body.album_id}_${req.body.page}_${req.body.page_size}`
  );
  if(redisData){
    return res.send({ data: redisData})
  } 
  const data = await mmApiService.getAlbumTracks(req)
  res.send({ data });
})

const getTrackLyrics = catchAsync(async (req, res) => {
  const redisData = await getCacheData(`lyrics_${req.body.track_id}`);
  if(redisData){
    return res.send({ data: redisData})
  } 
  const data = await mmApiService.getTrackLyrics(req)
  res.send({ data });
})

module.exports = {
  getTopArtists,
  getArtistAlbums,
  getAlbumTracks,
  getTrackLyrics
};
