import PouchDB from 'pouchdb';

if (process.env.NODE_ENV !== 'production') {
  window.PouchDB = PouchDB; // for PouchDB dev tools
}

const playlistDB = new PouchDB('playlist');

// Helper
function normalizePlaylist(playlist) {
  return {
    ...playlist,
    tracks: playlist.tracks.map(t => t.id), // Just return the track ids
  };
}

// Exported methods
export async function deletePlaylist(id) {
  const playlist = await playlistDB.get(id);
  await playlistDB.remove(playlist);
};

export async function createPlaylist(name) {
  const newPlaylist = { name, tracks: [] };
  const created = await playlistDB.post(newPlaylist);
  const playlist = await playlistDB.get(created.id);
  return playlist;
};

export async function listPlaylists() {
  const { rows } = await playlistDB.allDocs({ include_docs: true });
  const playlists = rows.map(({ doc }) => doc);
  return playlists;
};

export async function listPlaylistTracks(id) {
  const playlist = await playlistDB.get(id);
  return playlist.tracks;
};

export async function addTrackToPlaylist(track, playlistId) {
  const playlist = await playlistDB.get(playlistId);

  // Add new track
  playlist.tracks.push(track);

  await playlistDB.put(playlist); // Put back to db

  return normalizePlaylist(playlist);
};

export async function removeTrackFromPlaylist(trackIndex, playlistId) {
  const playlist = await playlistDB.get(playlistId);

  // Remove track
  playlist.tracks.splice(trackIndex, 1);
  
  await playlistDB.put(playlist); // Put back to db
  
  return normalizePlaylist(playlist);
};