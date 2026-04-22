const db = require("../utils/firebase");
const collection = db.collection("items");

exports.getItems = async (req, res) => {
  const snapshot = await collection.get();
  const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(items);
};

exports.getItemById = async (req, res) => {
  const doc = await collection.doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ message: "No encontrado" });
  res.json({ id: doc.id, ...doc.data() });
};

const fetch = require("node-fetch");

exports.createItem = async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Nombre y precio son obligatorios" });
  }

  const ref = await collection.add({ name, price: Number(price) });

  try {
    await fetch("https://forestless-nonreverently-loralee.ngrok-free.dev/webhook/new-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: ref.id, name, price: Number(price) })
    });
    console.log("Webhook enviado");
  } catch (err) {
    console.error("Error n8n:", err);
  }

  res.status(201).json({ id: ref.id, name, price: Number(price) });
};


exports.updateItem = async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).json({ message: "Nombre y precio son obligatorios" });
  await collection.doc(req.params.id).update({ name, price: Number(price) });
  res.json({ id: req.params.id, name, price: Number(price) });
};

exports.deleteItem = async (req, res) => {
  await collection.doc(req.params.id).delete();
  res.json({ message: "Eliminado correctamente" });
};