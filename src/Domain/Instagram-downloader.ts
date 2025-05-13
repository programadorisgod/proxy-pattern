import type { ThirdPartyDownloader } from "../interface/third-party-downloader.js";

export class InstagramManager {
  constructor(private readonly downloader: ThirdPartyDownloader) {}

  async download(url: string): Promise<string | void> {
    try {
      return await this.downloader.download(url);
    } catch (error) {
      console.log(error);
    }
  }
}
