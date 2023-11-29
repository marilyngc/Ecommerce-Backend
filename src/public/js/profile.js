
const profileBtn = document.getElementById("getProfile");

profileBtn.addEventListener("click", () => {
    // enviamos la petición al servidor
    fetch("http://localhost:8080/login",{
        method:"get",
        headers:{
            "Content-type":"application/json",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`

        },
    }).then(res => { return res.json({message:"holaaa"})})
    .then(data =>{ 
        console.log(data)
      
    })

});

document.addEventListener("DOMContentLoaded",async()=>{
    const welcomeUser = document.getElementById("welcomeUser");
    const response = await fetch("/api/users/profile", {
        headers:{
            "Content-type":"application/json"
        },
        method:"POST",
    });
    const result = await response.json();
    if(result.status === "success"){
        console.log("result", result.data);
        welcomeUser.innerHTML= `Bienvenido ${result.data.first_name}`;
    } else {
        window.location.href="/login";
    }
});