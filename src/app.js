import express, { request, response } from "express";
import { productsRouter } from "./routes/products.routes.js";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { chatService } from "./dao/index.js";
import { connectDB } from "./config/dbConnection.js";
import { viewsRouter } from "./routes/views.routes.js";



const port = 8080;

const app = express();

// middleare
app.use(express.static(path.join(__dirname, "/public")));
// para indicar al servidar que vaa estar ejecutandose en el puerto 8080
const httpServer = app.listen(port, () =>
  console.log(`Servidor ejecutandose en el puerto ${port}`)
);

// conexion base de datos
connectDB();


// servidor de websocket
const io = new Server(httpServer);
app.use(express.json());

// configuracion de handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

// routes
app.use("/api/products", productsRouter);
app.use(viewsRouter)


// socket server
io.on("connection", async (socket) => {


  console.log("cliente conectado");


  socket.emit("chatHistory", chatService);

// recibimos el mensaje de cada usuario
    socket.on("msgChat",async (data)=>{
        console.log(data);
      
        // guardamos el mensaje en la base de datos de forma asíncrona
        const message = await chatService.addMessage(data);

 
        // enviamos el historial del chat a todos los ususrios conectados
        io.emit("chatHistory",message);
    });

    // recibimos mensaje de coneccion de nuevo cliente
    socket.on("authenticated",(data)=>{
        // => broadcast es para emitir la información al todos los usuarios menos al que se está logueando
        socket.broadcast.emit("newUser",`El usuario ${data.name} se acaba de conectar `)
    });
});