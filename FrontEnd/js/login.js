
const formNotice = document.getElementById("login")
    .addEventListener("submit", async function (event) {
        event.preventDefault();
        const userInfo = {
            email: event.target.querySelector("[type=email]").value,
            password: event.target.querySelector("[type=password]").value,
        };
        // Create the payload in JSON format
        const payload = JSON.stringify(userInfo);
        // Call the fetch function with all the necessary information
        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: payload
            });
            if (response.ok) {
                const dataResponse = await response.json();
                document.location.href = "edit-page.html"
                localStorage.setItem('token', JSON.stringify(dataResponse.token))
                localStorage.setItem('userId', JSON.stringify(dataResponse.userId))
            }
            else {
                throw new Error("Erreur dans l’identifiant ou le mot de passe")
            }

        } catch (error) {
            const infoError = document.getElementById("info-error")
            infoError.innerText = error.message;
            infoError.classList.add("infolog")
        }npm

})

