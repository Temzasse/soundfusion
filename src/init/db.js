import PouchDB from 'pouchdb';
window.PouchDB = PouchDB;

const playlistDB = new PouchDB('playlist');
const trackDB = new PouchDB('track');
const userDB = new PouchDB('user');

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
  const { rows } = await playlistDB.allDocs({
    include_docs: true,
  });
  const playlists = rows.map(({ doc }) => doc);
  return playlists;
};