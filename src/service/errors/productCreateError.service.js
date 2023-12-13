export const productCreateError = (product) => {
    return `
    Todos los campos son obligatorios,
    Listado de campos obligatorios:
    title: Este campo debe ser de tipo string, y se recibio ${product.title},
    // lastname: Este campo debe ser tipo string, y se recibió ${product.lastname},`
    // email: Este campo debe ser tipo string, y se recibió ${product.email},
    // Listado campos opcionales:
    // age: Este campo dbe be tipo numerico, y se recibió ${product.age},

    // `
};