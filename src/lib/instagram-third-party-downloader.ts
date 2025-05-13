import { Readable } from "node:stream";
import type { ThirdPartyDownloader } from "../interface/third-party-downloader.js";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";

export class InstagramThirdPartyDownloader implements ThirdPartyDownloader {
  async download(url: string): Promise<string | void> {
    try {
      const response = await fetch(
        `http://localhost:3000/api/video?postUrl=${url}`
      );

      if (!response.ok) {
        console.log("Error");
        return;
      }
      const data = await response.json();

      if (data?.status !== "success") {
        console.log("Error getting post url");
        return;
      }

      const { data: info } = data;

      const post = await fetch(info.videoUrl);

      if (!post.body) {
        console.warn("No body");
        return;
      }

      const arrayBuffer = await post.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);

      const stream = Readable.from(buffer);

      await pipeline(stream, createWriteStream(info.filename));

      console.log("✅ File downloaded with exito");
      return info.filename;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
