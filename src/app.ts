import express from "express";
import cors from "cors";
import { join } from "path";

const app = express();

import { InstagramManager } from "./Domain/Instagram-downloader.js";
import { InstagramThirdPartyDownloader } from "./lib/instagram-third-party-downloader.js";
import { CachedInstagramDownloader } from "./proxy/index.js";
import { DownloaderController } from "./controller/download.js";



const instagramDownloaderService = new InstagramThirdPartyDownloader();

const cachedInstagramDownloader = new CachedInstagramDownloader(
  instagramDownloaderService
);

const manager = new InstagramManager(cachedInstagramDownloader);

const downloaderController = new DownloaderController(manager);

await cachedInstagramDownloader.login("admin", "admin");
console.log("✅ Administrative session started");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/videos", express.static(join(process.cwd(), "videos")));

// Ruta para descargar videos
app.post("/api/download", (req, res, next) => {
  downloaderController.download(req, res, next).catch(next);
});

export default app;
