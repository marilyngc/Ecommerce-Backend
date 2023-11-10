//capturamos elemento del formulario
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("sudmit", (e) => {
    e.preventDefault();
    console.log(e.target.name);

    // capturamos el valor e los input
    const info = {
        name:e.target.name.value,
        email:e.target.name.value
    };


    // enviamos la petición al servidor
    fetch("http://localhost:8080/login",{
        method:"post",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(info)
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data);
        // se guarda automaticamente en el almacenamiento de las cookies
    });
});