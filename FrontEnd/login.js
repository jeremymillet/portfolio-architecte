
const formulaireAvis = document.getElementById("login");
formulaireAvis.addEventListener("submit", async function (event) {
event.preventDefault();
    const log = {
        email: event.target.querySelector("[type=email").value,
        password: event.target.querySelector("[type=password]").value,
    };
    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(log);
    console.log(chargeUtile);
    // Appel de la fonction fetch avec toutes les informations nécessaires
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    })
    .then(function (reponse){
        if (reponse.status === 200) {
            window.location.href='edit-page.html';
        }
        else{
            const infolog = document.createElement("p")
            infolog.innerText = "Erreur dans l’identifiant ou le mot de passe";
            infolog.classList.add("infolog")
            const connection = document.querySelector(".connection")
            connection.appendChild(infolog)
        }
    });
    
})

