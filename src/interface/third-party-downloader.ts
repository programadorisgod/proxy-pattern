export type ThirdPartyDownloaderResult = {
  success: boolean;
  filename: string | null;
  isCached: boolean | null;
  error: string | null;
};

export interface ThirdPartyDownloader {
  download(url: string): Promise<ThirdPartyDownloaderResult>;
}
