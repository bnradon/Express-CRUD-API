const express = require("express");
const itemsRoutes = require("./src/routes/items.routes");
const { logRequest } = require("./src/utils/logger");
const cors = require("cors");

const app = express();

// Leer solicitudes JSONs
app.use(express.json());

// CORS
app.use(cors());

// Logs
app.use(async (req, res, next) => {
  await logRequest(req);
  next();
});

// Rutas
app.use("/items", itemsRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Conexión correcta con el servidor :)");
});

// Arrancar servidor
const PORT = 3000;
app.listen(PORT, () => {
  1;
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
