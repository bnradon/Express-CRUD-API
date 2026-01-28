
//Brandon Guerrero
//Ing Software VII Semestre

const fs = require("fs");
const http = require("http"); 
const path = require("path");
const os = require("os");
const eventos = require("events");

const EventEmitter = new eventos();


//Registro de eventos

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


// funcion para logs
async function logRequest(req) {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    const logFilePath = path.join(__dirname, 'log.txt');
    
    try {
        await fs.promises.appendFile(logFilePath, logMessage);
    } catch (err) {
        console.error('Error writing to log file:', err);
    }
}

const http = require("http");
const server = http.createServer(async(req, res) => {
  await logRequest(req);
  
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Bienvenido al servidor de archivos");

     } else if (req.url === '/info'){

    const systemInfo = {
            platform: os.platform(),
            architecture: os.arch(),
            freeMemory: os.freemem(),
            totalMemory: os.totalmem(),
            uptime: os.uptime()
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(systemInfo, null, 2));
        

         } else if (req.url === '/time') {
        // Get current server time
        const currentTime = new Date().toLocaleString();
        res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Hora del servidor: ${currentTime}`);

//----------------------------------------------------------------------------------------------------


  } else if (req.url === "/leer") {
    console.log("Entrando a /leer...")
    //registro ruta serviio leer
    const filePath = path.join(__dirname, "messages.txt");
    fs.readFile(filePath, "utf-8", (err, data) => 
    
      {
        
    //mensaje de error por https
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error leyendo el archivo: El archivo no existe");
        return;
      }
  
  
    //Caso de exito - leemos archivo
      //evento de leer archivo

      EventEmitter.emit("fileRead", "messages.txt");
    //Data http
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    });



//-----------
 
  // LEER LOGS (nuevo)

    } else if (req.url === "/leer-log") {
    console.log("leyendo log.txt...")
    //registro ruta serviio leer
    const filePath = path.join(__dirname, "log.txt");
    fs.readFile(filePath, "utf-8", (err, data) => 



      {
        
    //mensaje de error por https
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error leyendo el archivo: El archivo no existe");
        return;
      }
  
  
    //Caso de exito - leemos archivo
      //evento de leer archivo

      EventEmitter.emit("fileRead", "log.txt");
    //Data http
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    });
 //----------------------------------------------------------------------------------------------------

} else if (req.url === "/actualizar") {
     console.log("Entrando a /actualizar...")
    const filePath = path.join(__dirname, "messages.txt");

    if(fs.existsSync(filePath)){}  
    
    else {
      res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("El archivo no existe, crear primero con /crear");
        return; 
    }

    fs.appendFile(filePath, "\n\nEsta linea se agrego desde /actualizar :D", (err)=> {

       
    //mensaje de error por https
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error actualizando el archivo");
        return;
      }
  


      EventEmitter.emit("fileUp", filePath);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Archivo actualizado ");
    });

//--------------------------------------------------------------------------------
  
} else if (req.url === "/eliminar") {
     console.log("Entrando a /eliminar...")
    const filePath = path.join(__dirname, "messages.txt");

    fs.unlink(filePath, (err)=> {
       
    //mensaje de error por https
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error eliminando el archivo: Nada que eliminar");
        return;
      }

      EventEmitter.emit("fileDel", "messages.txt");

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Archivo eliminado :(");
    });

//----------------------------------------------------------------------------------------

    } else if (req.url === "/crear") {
     console.log("Entrando a /crear...")
    const filePath = path.join(__dirname, "messages.txt");

    fs.writeFile(filePath, "Nuevo Archivo", (err)=> {
       
    //mensaje de error por https
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error al crear el archivo");
        return;
      }
  


      EventEmitter.emit("fileNew", "messages.txt");

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Archivo creado");
    });

    // ------------------------------------------------------------------------------

   } else {
    res.writeHead(404, { "Content-type": "text/plain" })
    res.end("ERROR 404 \nPagina no encontrada")
  }
});



server.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
