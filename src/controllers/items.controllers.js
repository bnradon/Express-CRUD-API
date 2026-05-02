const itemService = require("../services/items.service");

exports.getItems = async (req, res) => {

  const items = await itemService.getItems();

  res.json(items);
};

exports.getItemById = async (req, res) => {

  const item = await itemService.getItemById(req.params.id);

  if (!item) {
    return res.status(404).json({
      message: "No encontrado"
    });
  }

  res.json(item);
};

exports.createItem = async (req, res) => {

  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Nombre y precio obligatorios"
    });
  }

  const item = await itemService.createItem(req.body);

  res.status(201).json(item);
};

exports.updateItem = async (req, res) => {

  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Nombre y precio obligatorios"
    });
  }

  const item = await itemService.updateItem(
    req.params.id,
    req.body
  );

  res.json(item);
};

exports.deleteItem = async (req, res) => {

  await itemService.deleteItem(req.params.id);

  res.json({
    message: "Eliminado correctamente"
  });
};