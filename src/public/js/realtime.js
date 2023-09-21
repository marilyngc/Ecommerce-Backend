const socketClient = io();

// elementos
const productList = document.getElementById("productList");
const createProductForm = document.getElementById("createProductForm");

// enviamos info del formulario al socket del servidor
createProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // forma para iterar los datos del formulario
  const formData = new FormData(createProductForm);
  //console.log(formData.get("title"));

  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    // key = name = ("title") , value = lo que ingrese el usuario
    jsonData[key] = value;
  };

  // si queremos convertir a formato numerico
  jsonData.price = parseInt(jsonData.price);
  console.log("productos tomados de formData",jsonData);


  
  // enviamos toda la información al socket del servidor
  socketClient.emit("addProduct", jsonData);
  createProductForm.reset();
});

// recibimos los productos
socketClient.on("productsArray", (dataProducts) => {
  console.log(dataProducts);
  let productsElements = "";

  dataProducts.forEach((element) => {
    productsElements += ` <li>
       <p>Nombre: ${element.title} </p> <button onClick="deleteProduct(${element.id})">Eliminar </button> 
       </li>`;
  });

  console.log(productsElements);

  productList.innerHTML = productsElements;
});

// borrar producto por id
const deleteProduct = (productId) => {
  console.log(productId);
  socketClient.emit("deleteProduct", productId);
};
