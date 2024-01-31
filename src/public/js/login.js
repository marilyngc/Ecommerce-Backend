const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async (e,token) => {
    e.preventDefault();


    const formValues = {
        email: e.target.email.value,
        password: e.target.password.value,
    };

    try {
        const response = await fetch("/api/users/login", {
            headers: {
                "Content-type": "application/json",
                // "Authorization": `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify(formValues),
        });

        console.log("response",response)
        if (response.status === 200) {
            const result = await response.json();
            if (result.status === "success") {
                // console.log("status succes",result.status)
                window.location.href = "profile";
            } else {
                errorMsg.innerHTML = "No fue posible loguear el usuario";
            }
        } else {
            // Manejar errores del servidor
            const errorData = await response.json(); // Intenta obtener detalles del error
            errorMsg.innerHTML = `Error en la solicitud: ${response.statusText}`;
            console.error("Error en la solicitud:", response.status, errorData);
        }
    } catch (error) {
        // Manejar errores de red o problemas con la solicitud
        errorMsg.innerHTML = "Error en la solicitud";
        console.error("Error en la solicitud:", error);
    }
});
