document.addEventListener("DOMContentLoaded",async()=>{
    const welcomeUser = document.getElementById("welcomeUser");

    const tuToken = localStorage.getItem("accessToken");
    const response = await fetch("/api/users/profile", {
        headers:{
            "Content-type":"application/json",
            "Authorization": `Bearer ${tuToken}`
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