import type {
  ThirdPartyDownloader,
  ThirdPartyDownloaderResult,
} from "../interface/third-party-downloader.js";

export interface CacheInfo {
  url: string;
  filename: string;
  timestamp: number;
}

export class CachedInstagramDownloader implements ThirdPartyDownloader {
  private _isValidUser: boolean = false;
  private _cache: Map<string, CacheInfo> = new Map();

  constructor(private readonly service: ThirdPartyDownloader) {}

  private normalizeUrl(url: string): string {
    const normalizedUrl = (new URL(url).search = "");

    return normalizedUrl.toString().trim();
  }

  async download(url: string): Promise<ThirdPartyDownloaderResult> {
    if (!this._isValidUser) {
      return Promise.reject(new Error("User not valid"));
    }

    const normalizedUrl = this.normalizeUrl(url);
    console.log(`Is in cache: ${this._cache.has(normalizedUrl)}`);

    if (this._cache.has(normalizedUrl)) {
      console.log("File already downloaded from cache");
      const urlCached = this._cache.get(normalizedUrl)?.filename!;

      return {
        filename: urlCached,
        isCached: true,
        error: null,
        success: true,
      };
    }

    try {
      const data = await this.service.download(url);

      if (!data.success) {
        return {
          filename: null,
          isCached: false,
          error: data.error,
          success: true,
        };
      }

      this._cache.set(normalizedUrl, {
        url: normalizedUrl,
        filename: data.filename!,
        timestamp: Date.now(),
      });

      return {
        filename: data.filename,
        isCached: false,
        error: null,
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        filename: null,
        isCached: false,
        error: null,
        success: true,
      };
    }
  }

  async login(username: string, password: string): Promise<void> {
    if (username === "admin" && password === "admin") {
      this._isValidUser = true;
      return Promise.resolve();
    }
    return Promise.reject(new Error("Invalid credentials"));
  }
}
