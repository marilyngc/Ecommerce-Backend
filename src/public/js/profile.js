
const profileBtn = document.getElementById("getProfile");

profileBtn.addEventListener("click", () => {
    // enviamos la petición al servidor
    fetch("http://localhost:8080/login",{
        method:"get",
        headers:{
            "Content-type":"application/json",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`

        },
    }).then(res => { return res.json()})
    .then(data =>{ 
        console.log(data)
      
    })

})