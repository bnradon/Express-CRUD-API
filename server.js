const express = require("express");
const itemsRoutes = require("./src/routes/items.routes");
const { logRequest } = require("./src/utils/logger");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use(async (req, res, next) => {
  await logRequest(req);
  next();
});

app.use("/items", itemsRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});