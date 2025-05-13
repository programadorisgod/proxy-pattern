import { InstagramManager } from "./Domain/Instagram-downloader.js";
import { InstagramThirdPartyDownloader } from "./lib/instagram-third-party-downloader.js";
import { CachedInstagramDownloader } from "./proxy/index.js";

const instagramDownloaderService = new InstagramThirdPartyDownloader();

const cachedInstagramDownloader = new CachedInstagramDownloader(
  instagramDownloaderService
);

const manager = new InstagramManager(cachedInstagramDownloader);

const url =
  "https://www.instagram.com/reel/DIAaQDSROho/?utm_source=ig_web_copy_link";

cachedInstagramDownloader.login("admin", "admin").then();
manager.download(url);
