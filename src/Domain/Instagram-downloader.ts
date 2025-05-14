import type {
  ThirdPartyDownloader,
  ThirdPartyDownloaderResult,
} from "../interface/third-party-downloader.js";

export class InstagramManager {
  constructor(private readonly downloader: ThirdPartyDownloader) {}

  async download(url: string): Promise<ThirdPartyDownloaderResult> {
    try {
      return await this.downloader.download(url);
    } catch (error) {
      console.log(error);

      return {
        filename: null,
        isCached: true,
        error: error as string,
        success: true,
      };
    }
  }
}
