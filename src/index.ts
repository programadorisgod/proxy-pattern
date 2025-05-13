import express from "express";
import cors from "cors";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import { InstagramManager } from "./Domain/Instagram-downloader.js";
import { InstagramThirdPartyDownloader } from "./lib/instagram-third-party-downloader.js";
import { CachedInstagramDownloader } from "./proxy/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/videos", express.static(join(__dirname, "../videos")));

// Inicializar el descargador con proxy de caché
const instagramDownloaderService = new InstagramThirdPartyDownloader();
const cachedInstagramDownloader = new CachedInstagramDownloader(
  instagramDownloaderService
);
const manager = new InstagramManager(cachedInstagramDownloader);

await cachedInstagramDownloader.login("admin", "admin");
console.log("✅ Sesión administrativa iniciada");

app.get("/api/health", (req, res) => {
  res.json({ status: "success", message: "Instagram Downloader API running" });
});

// Ruta para descargar videos
app.post("/api/download", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        status: "error",
        message: "URL no proporcionada",
      });
    }

    console.log(`📥 Solicitud de descarga para: ${url}`);

    const isInCache = cachedInstagramDownloader.isUrlCached(url);
    
    if (isInCache) {
      console.log("📦 Video recuperado desde caché");
    } else {
      console.log("⬇️ Descargando video...");
    }

    const filename = await manager.download(url);

    if (!filename) {
      return res.status(500).json({
        status: "error",
        message: "Error al descargar el video",
      });
    }

    const filePath = join(__dirname, "..", filename);
    const fileExists = existsSync(filePath);

    if (!fileExists) {
      return res.status(404).json({
        status: "error",
        message: "El archivo no existe en el sistema",
      });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/${filename}`;

    return res.json({
      status: "success",
      message: isInCache
        ? "Video recuperado desde caché"
        : "Video descargado exitosamente",
      fromCache: isInCache,
      data: {
        filename,
        url: fileUrl,
      },
    });
  } catch (error) {
    console.error("Error en descarga:", error);
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor API iniciado en http://localhost:${PORT}`);
  console.log(
    `📁 Servidor de archivos estáticos disponible en http://localhost:${PORT}/videos`
  );
});
