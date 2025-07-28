import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { playlistController } from "./controllers/playlist-controller.js";

export const router = express.Router();

router.get("/", dashboardController.index);
router.get("/dashboard", dashboardController.index);
router.get("/about", aboutController.index);
router.get("/playlist/:id", playlistController.index);
router.post("/dashboard/addplaylist", dashboardController.addPlaylist);
router.post("/playlist/:id/addtrack", playlistController.addTrack);
router.get("/dashboard/deleteplaylist/:id", dashboardController.deletePlaylist);
router.get("/playlist/:playlistid/deletetrack/:trackid", playlistController.deleteTrack);
