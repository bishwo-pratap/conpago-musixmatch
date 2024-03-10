const allRoles = {
  user: ['topArtists','artistAlbums','albumTracks','trackLyrics'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
