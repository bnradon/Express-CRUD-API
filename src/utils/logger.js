const fs = require("fs");
const path = require("path");
const eventos = require("events");

const EventEmitter = new eventos();



// Registro de eventos
EventEmitter.on("fileRead", (filename) => {
  console.log(`El archivo "${filename}" se ha leído exitosamente.`);
});
EventEmitter.on("fileNew", (filename) => {
  console.log(`El archivo "${filename}" se ha creado exitosamente`);
});
EventEmitter.on("fileUp", (filename) => {
  console.log(`El archivo "${filename}" se ha actualizado exitosamente`);
});
EventEmitter.on("fileDel", (filename) => {
  console.log(`El archivo "${filename}" se ha eliminado exitosamente`);
});


// Logs de peticiones http
async function logRequest(req) {
  const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  const logFilePath = path.join(__dirname, 'log.txt');
  try {
    await fs.promises.appendFile(logFilePath, logMessage);
  } catch (err) {
    console.error('Error escribiendo en log.txt:', err);
  }
}

module.exports = { EventEmitter, logRequest };
