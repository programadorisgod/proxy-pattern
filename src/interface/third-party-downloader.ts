export interface ThirdPartyDownloader {
  download(url: string): Promise<string | void>;
}
