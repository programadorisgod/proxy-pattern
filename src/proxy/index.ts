import type { ThirdPartyDownloader } from "../interface/third-party-downloader.js";

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

  async download(url: string): Promise<string | void> {
    if (!this._isValidUser) {
      return Promise.reject(new Error("User not valid"));
    }

    const normalizedUrl = this.normalizeUrl(url);
    console.log(`Is in cache: ${this._cache.has(normalizedUrl)}`);

    if (this._cache.has(normalizedUrl)) {
      console.log("File already downloaded from cache");
      return Promise.resolve(this._cache.get(normalizedUrl)?.filename);
    }

    try {
      const filename = (await this.service.download(url)) as string;
      this._cache.set(normalizedUrl, {
        url: normalizedUrl,
        filename,
        timestamp: Date.now(),
      });
      return filename;
    } catch (error) {
      console.log(error);
      return Promise.reject(new Error("Error downloading file"));
    }
  }

  async login(username: string, password: string): Promise<void> {
    if (username === "admin" && password === "admin") {
      this._isValidUser = true;
      return Promise.resolve();
    }
    return Promise.reject(new Error("Invalid credentials"));
  }

  isUrlCached(url: string): boolean {
    const normalizedUrl = this.normalizeUrl(url);
    return this._cache.has(normalizedUrl);
  }
}
