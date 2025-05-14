import app from "./app.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running  http://localhost:${PORT}`);
  console.log(
    `📁 Static file server available at http://localhost:${PORT}/videos`
  );
});
