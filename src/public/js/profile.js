document.addEventListener("DOMContentLoaded",async()=>{
    const welcomeUser = document.getElementById("welcomeUser");

   
    const response = await fetch("api/users/profile", {
        headers:{
            "Content-type":"application/json" },
        method:"POST",
    });
  
    const result = await response.json();
    console.log("profileJS", result)
    if(result.status === "success"){
        console.log("result", result.data);
        welcomeUser.innerHTML= `Bienvenido ${result.data.email}`;
    } else {
        window.location.href="/login";
    }
});