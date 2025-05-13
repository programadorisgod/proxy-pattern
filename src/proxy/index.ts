import type { ThirdPartyDownloader } from "../interface/third-party-downloader.js";

export class CachedInstagramDownloader implements ThirdPartyDownloader {
  private _isValidUser: boolean = false;
  private _cache: Map<string, string> = new Map();
  constructor(private readonly service: ThirdPartyDownloader) {}

  async download(url: string): Promise<void> {
    if (!this._isValidUser) {
      return Promise.reject(new Error("User not valid"));
    }

    if (this._cache.has(url)) {
      console.log("File already downloaded");
      return Promise.resolve();
    }

    this._cache.set(url, url);
    try {
      await this.service.download(url);
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
}
