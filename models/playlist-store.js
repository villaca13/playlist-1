import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { trackStore } from "./track-store.js";

const db = initStore("playlists");

export const playlistStore = {
  async getAllPlaylists() {
    await db.read();
    return db.data.playlists;
  },

  async addPlaylist(playlist) {
    await db.read();
    playlist._id = v4();
    db.data.playlists.push(playlist);
    await db.write();
    return playlist;
  },

  async getPlaylistById(id)  {
    await db.read();
    const list = db.data.playlists.find((playlist) => playlist._id === id);
    list.tracks = await trackStore.getTracksByPlaylistId(list._id);
    return list;
  },

  async getPlaylistsByUserId(userid) {
    await db.read();
    return db.data.playlists.filter((playlist) => playlist.userid === userid);
  },

  async deletePlaylistById(id) {
    await db.read();
    const index = db.data.playlists.findIndex((playlist) => playlist._id === id);
    db.data.playlists.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaylists() {
    db.data.playlists = [];
    await db.write();
  },
};
