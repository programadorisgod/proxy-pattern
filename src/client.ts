/**
 * Cliente de prueba para la API de descarga de Instagram
 */

const url =
  "https://www.instagram.com/reel/DIAaQDSROho/?utm_source=ig_web_copy_link";
const API_URL = "http://localhost:4000/api/download";

async function testDownload() {
  console.log("🧪 Probando API de descarga de Instagram");
  console.log(`📨 Enviando solicitud para descargar: ${url}`);

  try {
    // Primera solicitud - debería descargar el video
    console.log("\n🔄 Primera solicitud - Descarga inicial");
    const response1 = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data1 = await response1.json();
    console.log("📥 Respuesta 1:", JSON.stringify(data1, null, 2));

    console.log("\n🔄 Segunda solicitud - Debería usar caché");
    const response2 = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data2 = await response2.json();
    console.log("📥 Respuesta 2:", JSON.stringify(data2, null, 2));

       // Segunda solicitud - debería usar el caché
    console.log("\n🔄 Segunda solicitud - Debería usar caché");
    const response3 = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data3 = await response3.json();
    console.log("📥 Respuesta 3:", JSON.stringify(data3, null, 2));
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Ejecutar prueba
testDownload();
