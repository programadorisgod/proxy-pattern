import { Readable } from "node:stream";
import type {
  ThirdPartyDownloader,
  ThirdPartyDownloaderResult,
} from "../interface/third-party-downloader.js";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";

export class InstagramThirdPartyDownloader implements ThirdPartyDownloader {
  async download(url: string): Promise<ThirdPartyDownloaderResult> {
    const result: ThirdPartyDownloaderResult = {
      success: false,
      isCached: false,
      filename: null,
      error: null,
    };

    try {
      const response = await fetch(
        `https://downloader-ig.vercel.app/api/video?postUrl=${url}`
      );

      if (!response.ok) {
        return result;
      }
      const data = await response.json();

      if (data?.status !== "success") {
        console.log("Error getting post url");
        return { ...result, error: "Error getting post url" };
      }

      const { data: info } = data;

      const post = await fetch(info.videoUrl);

      if (!post.body) {
        console.warn("No body");

        return { ...result, error: "Error getting body" };
      }

      const arrayBuffer = await post.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);

      const stream = Readable.from(buffer);
      const pathFile = path.join(process.cwd(), "videos", info.filename);
      await pipeline(stream, createWriteStream(pathFile));

      console.log("✅ File downloaded with exito");
      console.log(pathFile, "INSTAGRAM");

      result.filename = info.filename;
      result.success = true;
      return result;
    } catch (error) {
      console.log(error);
      return { ...result, error: "Error in download" };
    }
  }
}
