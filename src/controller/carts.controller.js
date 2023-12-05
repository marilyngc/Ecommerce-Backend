// capa de control


// importar la capa de servicio
import { CartsService } from "../service/carts.service.js";
import {ProductsService} from "../service/products.service.js";

export class CartsController{
      // usamos static para poder llamarlos directamente para no crear una instancia
    static getCart = async (req, res) => {
        try {
          const carts = await CartsService.getCart();
          res.json({ data: carts });
        } catch (error) {
          res.json({ error: error.message });
        }
      }

      static getCartById = async (req, res) => {
        try {
          const id = req.params.cid;
          const cartId = await CartsService.getCarById(id);
          console.log(cartId);
          if (cartId) {
            return res.json({ data: cartId });
          } else {
            res.json({ message: `No existe el ${id} solicitado` });
          }
        } catch (error) {
          res.json({ error: error.message });
        }
      };


      static postCart = async (req, res) => {
        try {
          const newCart = await CartsService.createCart();
          res.json({ status: "succes", data: newCart });
        } catch (error) {
          res.json({ status: "error", error: error.message });
        }
      }

      static postCartProductId = async (req, res) => {
        try {
          // validamos si los dos sirven
          const cartId = parseInt(req.params.cid);
          const productId = parseInt(req.params.pid);
         
          const cart = await CartsService.getCarById(cartId);
          const product = await ProductsService.getProductsById(productId);
          const newProduct = await CartsService.addProductToCart(cart, product);
      
          res.json({ message: "Agregando producto al carrito...", newProduct });
        } catch (error) {
          res.json({ error: error.message });
        }
      }

      static deleteCartProductId = async (req, res) => {
        try {
          // validamos si los dos sirven
          const cartId = parseInt(req.params.cid);
          const productId = parseInt(req.params.pid);
          const cart = await CartsService.getCarById(cartId);
          const product = await ProductsService.getProductsById(productId);
          const newProduct = await CartsService.deleteProduct(cart, product);
      
          res.json({ message: "Eliminando producto del carrito...", newProduct });
        } catch (error) {
          res.json({ error: error.message });
        }
      }

      static putCartProductId = async (req, res) => {
        try {
          // validamos si los dos sirven
          const cartId = parseInt(req.params.cid);
          const productId = parseInt(req.params.pid);
          const { newQuantity } = req.body;
          const cart = await CartsService.getCarById(cartId);
          const product = await ProductsService.getProductsById(productId);
          const newProduct = await CartsService.updateProductCart(
            cart,
            product,
            newQuantity
          );
      
          res.json({ message: "Eliminando producto del carrito...", newProduct });
        } catch (error) {
          res.json({ error: error.message });
        }
      };

      static purchaseCart = async(req,res) => {
        try {
          const {cid:cartId} = req.params;
          const cart = await CartsService.getCarById(cartId);
          const ticketProducts = [];
          // los productos que se rechaza
          const rejectedProducts = [];
          // verificar el stock de cada producto
          if (cart.products.lenght) {
            for(let i = 0; i >cart.products.lenght;i++){
              const cartProduct = cart.products[i];
              const productInfo = cartProduct.productId;
                // por cada producto comparar quantity con el stock
                if (cartProduct.quantity <= productInfo.stock) {
                  // agregamos los productos en stock
                  ticketProducts.push(cartProduct);
                }else{
                  rejectedProducts.push(cartProduct);
                }

                //generamos el nuevo ticket
                const newTicket = {
                  code:34234,
                  purcharse_datetime:new Date(),
                  amount:ticketProducts.quantity,
                  purcharse:req.user.email
                }

                // crear ticket en base de datos
                // actualizar rl carrito del usuario con los productos rechazados
                
              
            }
          }else{
            res.json({status:"error",message:"carrita está vacio"});
          }
        } catch (error) {
          res.json({ error: error.message });
        }
      }
}