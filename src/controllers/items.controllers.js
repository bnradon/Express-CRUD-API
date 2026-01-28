const fs = require("fs");
const path = require("path");


const dataDir = path.join(process.cwd(), "data");
const dataPath = path.join(dataDir, "items.json");

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([], null, 2));
  }
}
ensureDataFile();

function readData() {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([]));
  }
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}



let items = readData();
let idCounter = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;



exports.getItems = (req, res) => {
  res.json(items);
};

exports.getItemById = (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);


  if (!item) return res.status(404).json({ message: "No se encontró el elemento" });
  res.json(item);
};

exports.createItem = (req, res) => {
  
const { name, price } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ 
      message: "Nombre y precio son obligatorios" 
    });
  }

  const newItem = {
    id: idCounter++,
    name,
    price,
  };

  items.push(newItem);
  writeData(items);

  res.status(201).json(newItem);
};


exports.updateItem = (req, res) => {

  const id = parseInt(req.params.id);

  const { name, price } = req.body;
  
  const index = items.findIndex(i => i.id === id);
  

  if (index === -1) return res.status(404).json({
    message: "No se encontró el elemento" });

    if (!name || !price) {
    return res.status(400).json({ 
      message: "Nombre y precio son obligatorios" 
    });
  }

  items[index] = { 
    id, 
    name,
    price,
    };

    writeData(items);

  res.json(items[index]);
  
};

exports.deleteItem = (req, res) => {
  const id = parseInt(req.params.id);  
  items = items.filter(i => i.id !== id);
  res.json({ message: "Se ha eliminado correctamente" });
};

