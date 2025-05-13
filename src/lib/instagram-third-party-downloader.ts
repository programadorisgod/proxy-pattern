import { Readable } from "node:stream";
import type { ThirdPartyDownloader } from "../interface/third-party-downloader.js";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";

export class InstagramThirdPartyDownloader implements ThirdPartyDownloader {
  async download(url: string): Promise<void> {
    try {
      const response = await fetch(
        `http://localhost:3000/api/video?postUrl=${url}`
      );

      if (!response.ok) {
        return console.log("Error");
      }
      const data = await response.json();

      if (data?.status !== "success") {
        return console.log("Error getting post url");
      }

      const { data: info } = data;
      console.info(data, "data");

      console.log(info);

      console.log(info.videoUrl);

      const post = await fetch(info.videoUrl);

      if (!post.body) {
        return console.warn("No body");
      }
      console.log(post.body, "body");

      const arrayBuffer = await post.arrayBuffer();
      console.log(arrayBuffer, "array buffer");

      const buffer = Buffer.from(arrayBuffer);

      console.log(buffer, "buffer");

      const stream = Readable.from(buffer);

      await pipeline(stream, createWriteStream(info.filename));

      console.log("✅ File downloaded with exito");
    } catch (error) {
      console.log(error);
    }
  }
}
