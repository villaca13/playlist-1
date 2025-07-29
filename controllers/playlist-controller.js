import { playlistStore } from "../models/playlist-store.js";
import { trackStore } from "../models/track-store.js";

export const playlistController = {
  async index(request, response) {
    const playlist = await playlistStore.getPlaylistById(request.params.id);

    let shortestTrack = null;
    if (playlist.tracks.length > 0) {
      shortestTrack = playlist.tracks[0];
      for (let i = 1; i < playlist.tracks.length; i++) {
        if (playlist.tracks[i].duration < shortestTrack.duration) {
          shortestTrack = playlist.tracks[i];
        }
      }
    }
    console.log(shortestTrack);

    const viewData = {
      title: "Playlist",
      playlist: playlist,
    };
    response.render("playlist-view", viewData);
  },


  async addTrack(request, response) {
    const playlist = await playlistStore.getPlaylistById(request.params.id);
    const newTrack = {
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration),
    };
    console.log(`adding track ${newTrack.title}`);
    await trackStore.addTrack(playlist._id, newTrack);
    response.redirect("/playlist/" + playlist._id);
  },

  async deleteTrack(request, response) {
    const playlistId = request.params.playlistid;
    const trackId = request.params.trackid;
    console.log(`Deleting Track ${trackId} from Playlist ${playlistId}`);
    await trackStore.deleteTrack(request.params.trackId);
    response.redirect("/playlist/" + playlistId);
  },

};
