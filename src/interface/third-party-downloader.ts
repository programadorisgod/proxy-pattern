export interface ThirdPartyDownloader {
  download(url: string): Promise<void>;
}
