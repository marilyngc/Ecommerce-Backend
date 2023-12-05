



document.addEventListener("DOMContentLoaded",function(){
    const addProductsToCart = document.querySelectorAll(".addProductsToCart");

    addProductsToCart.forEach(button => {
        button.addEventListener("click", function(){
            const productId = this.dataset.productId;
            
            // realizamos una solictud POST al servidor para agregar el producto al carrito
            fetch("/api/carts"),{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId: productId })
            }
            console.log(productId)
        })
        .then(response = response.json())
        .then(data => {
            //Manejar la respuesta del servidor si es necesario
            console.log(data);
        })
        .catch(error => {
            console.error("Error:",error);
        })
    })
})