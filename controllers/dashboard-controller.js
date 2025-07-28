import { playlistStore } from "../models/playlist-store.js";


export const dashboardController = {
  
  async index(request, response) {
    const viewData = {
      title: "Playlist Dashboard",
      playlists: await playlistStore.getAllPlaylists(),
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
  
  async addPlaylist(request, response) {
    const newPlaylist = {
      title: request.body.title,
    };
    console.log(`adding playlist ${newPlaylist.title}`);
    await playlistStore.addPlaylist(newPlaylist);
    response.redirect("/dashboard");
  },

  async deletePlaylist(request, response) {
    const playlistId = request.params.id;
    console.log(`Deleting Playlist ${playlistId}`);
    await playlistStore.deletePlaylistById(playlistId);
    response.redirect("/dashboard");
  },

};
