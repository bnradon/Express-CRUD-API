const express = require("express");
const router = express.Router();


const {

  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  updateItemAI
  
} = require("../controllers/items.controllers");

router.get("/", getItems);
router.get("/:id", getItemById);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
router.put("/:id/ai", updateItemAI);

module.exports = router;