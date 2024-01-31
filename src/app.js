import express, { request, response } from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { usersRouter } from "./routes/users.routes.js";

import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { connectDB } from "./config/dbConnection.js";
import { viewsRouter } from "./routes/views.routes.js";
import cookieParser from "cookie-parser";
import {initializePassport} from "./config/passport.config.js";
import passport from "passport";
import { config } from "./config/config.js";
// import {errorHandler} from "./middlewares/errorHandler.js"


import {swaggerSpecs} from "./config/swagger.config.js";
import swaggerUi from "swagger-ui-express";

const port = config.server.port;

const app = express();

// middleare
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended:true})); // para leer formualrios
app.use(express.json()); // para leer json
app.use(cookieParser());




// configuracion de passport
initializePassport();
app.use(passport.initialize());



// para indicar al servidar que vaa estar ejecutandose en el puerto 8080
const httpServer = app.listen(port, () =>
  console.log(`server working on ${port}`)
);




// // conexion base de datos
// connectDB();


// servidor de websocket
const io = new Server(httpServer);

// configuracion de handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

// routes
app.use(viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts",cartsRouter);
app.use("/api/users", usersRouter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// app.use(errorHandler);







// socket server
io.on("connection", async(socket)=>{
  console.log("cliente conectado");
  const products = await productsService.getProducts();
  socket.emit("productsArray", products);

  //recibir el producto del socket del cliente
  socket.on("addProduct",async(productData)=>{
      const result = await productsService.createProduct(productData);
      const products = await productsService.getProducts();
      io.emit("productsArray", products);
  });
});

export {app}; //para evitar que se ejecute dos terminales