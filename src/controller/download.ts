import type { Request, Response } from "express";
import type { InstagramManager } from "../Domain/Instagram-downloader.js";

import { FileManager } from "../utils/file.js";
import { generateUrl } from "../utils/genetare-url.js";

export class DownloaderController {
  constructor(private readonly manager: InstagramManager) {}

  download = async (req: Request, res: Response, _next: Function) => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    try {
      const data = await this.manager.download(url);

      if (!data.success) {
        return res.status(500).json({
          status: "error",
          message: "Error al descargar el video",
        });
      }

      const fileExists = FileManager.fileExists(data.filename!);

      if (!fileExists) {
        return res.status(404).json({
          status: "error",
          message: "File not found",
        });
      }

      const fileUrl = generateUrl(req, data.filename!);

      return res.json({
        status: "success",
        message: "Video recovered from cache",
        data: {
          filename: data.filename!,
          url: fileUrl,
        },
      });
    } catch (error) {
      console.error("Error in download:", error);
      return res.status(500).json({
        status: "error",
        message: error instanceof Error ? error.message : "A unkonow error",
      });
    }
  };
}
