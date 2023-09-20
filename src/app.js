import express, { request, response } from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { viewsRouter } from "./routes/views.routes.js";
import { productsService } from "./persistence/index.js";

const port = 8080;

const app = express();

// middleare
app.use(express.static(path.join(__dirname, "/public")));
// para indicar al servidar que vaa estar ejecutandose en el puerto 8080
const httpServer = app.listen(port, () =>
  console.log(`Servidor ejecutandose en el puerto ${port}`)
);

// servidor de websocket
const io = new Server(httpServer);
app.use(express.json());

// configuracion de handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

// routes
app.use(viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// socket server
io.on("connection", async (socket) => {
  console.log("cliente conectado");

  const products = await productsService.getProduct();
  // mandamos los productos al cliente
  socket.emit("productsArray", products);

  // recibir los datos del socket del cliente
  socket.on("addProduct", async (productData) => {
    // primero crea el producto
    const result = await productsService.addProducts(productData);

    // una vez creados, obtenemos los productos
    const products = await productsService.getProduct();
  });
  // mandamos los productos actualizados al cliente
  io.emit("productsArray", products);
});
