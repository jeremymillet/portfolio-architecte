//Function to generate articles in the gallery
function generateArticle(article) {
    document.getElementsByClassName("gallery")[0]
        .innerHTML = ""
    for (let i = 0; i < article.length; i++) {
        const tabArticle = article[i];
        // Get the DOM element that will host the cards
        const sectionCards = document.getElementsByClassName("gallery")[0];
        // Creation of a tag dedicated to an image.
        const articleElement = document.createElement("article");
        // Creation of tags.
        const imageElement = document.createElement("img");
        imageElement.crossOrigin = "anonymous";
        imageElement.src = tabArticle.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = tabArticle.title;
        // We attach the 'article' tag to the 'Fiches' section.
        sectionCards.appendChild(articleElement);
        articleElement.appendChild(imageElement);
        articleElement.appendChild(nomElement);
    }
}

//Function to generate articles in the modal
function generateArticleInTheModale(article) {
    document.getElementById("work-to-delete")
        .innerHTML = ""
    for (let i = 0; i < article.length; i++) {
        const tabArticle = article[i];
        //Get the DOM element that will host the cards
        const sectionCards = document.getElementById("work-to-delete");
        // Creation of a tag dedicated to an image.
        const articleElement = document.createElement("article");
        // Creation of tags.
        const imageElement = document.createElement("img");
        imageElement.crossOrigin = "anonymous";
        imageElement.src = tabArticle.imageUrl;
        const deleteBouton = document.createElement("button");
        deleteBouton.dataset.id = article[i].id;
        const deleteBoutonImg = document.createElement("img");
        deleteBoutonImg.src = "assets/icons/trash.svg"
        // We attach the 'article' tag to the 'Fiches' section.
        sectionCards.appendChild(articleElement);
        articleElement.appendChild(imageElement);
        articleElement.appendChild(deleteBouton)
        deleteBouton.appendChild(deleteBoutonImg)
    }
}
//Modal display function
function displayModal() {
    const overlay = document.getElementsByClassName("overlay")[0]
    const modaleContainer = document.getElementsByClassName("modale-container")[0]
    const modale = document.getElementsByClassName("modale")[0]
    const modaleAdd = document.getElementsByClassName("modale-add")[0]

    // hide modale on close button click or overlay click
    function hideModale() {
        modaleContainer.classList.add("invisible")
        overlay.classList.add("invisible")
        modale.classList.add("invisible")
    }
    document.querySelectorAll(".close-modale, .overlay").forEach(button => {
        button.addEventListener('click', hideModale)
    })

    // show modale on open button click
    function showModale(modale) {
        modaleContainer.classList.remove("invisible")
        modale.classList.remove("invisible")
        overlay.classList.remove("invisible")
        modaleAdd.classList.add("invisible")
    }
    document.querySelector(".title-project .open-modale")
        .addEventListener('click', () => showModale(modale))
    document.querySelector("#edit-nav .open-modale")
        .addEventListener('click', () => showModale(modale))

    // switch to add modale on add button click
    document.getElementById("add").addEventListener('click', () => {
        document.getElementById("form-add").reset()
        const file = document.getElementById("input-img")
        file.value = ""
        document.querySelector(".form-file-selected-info img").src = "/assets/icons/picture-svgrepo-com.png"
        document.getElementsByClassName("form-file-placeholder")[0].classList.remove("invisible")
        document.querySelector(".form-container-image p").classList.remove("invisible")
        modaleAdd.classList.remove("invisible")
        modale.classList.add("invisible")
        setSubmitButton()
    })

    // switch to delete modale on back button click
    document.getElementById("back-to-delete").addEventListener('click', () => {
        modale.classList.remove("invisible")
        modaleAdd.classList.add("invisible")
    })
}
//file input preview
function readURL(input) {
    var image = URL.createObjectURL(input.target.files[0])
    var imageDiv = document.querySelector(".form-file-selected-info img")
    imageDiv.src = image
    imageDiv.classList.add("preview-img")
    document.getElementsByClassName("form-file-placeholder")[0]
        .classList.add("invisible")
    document.querySelector(".form-container-image p")
        .classList.add("invisible")
}
//Function to send a work
function sendNewWork(category, token) {
    const formAdd = document.getElementById("form-add")

    formAdd.addEventListener("submit", handleSubmit)

    async function handleSubmit(event) {
        event.preventDefault();
        const categorySelected = document.getElementById("category").value
        function defCategory() {
            if (categorySelected === "Objets") {
                return category[0].id
            }
            else if (categorySelected === "Appartements") {
                return category[1].id
            }
            else if (categorySelected === "Hotels & restaurants") {
                return category[2].id
            }
        }
        let formData = new FormData()
        //Création de la charge utile
        formData.append("image", event.target.querySelector("[type=file]").files[0])
        formData.append("title", event.target.querySelector("[type=text]").value)
        formData.append("category", defCategory())


        // Calling the fetch function with all the necessary information.

        try {
            const response = await fetch("https://back-p3-oc.onrender.com/api/works", {
                method: "POST",
                headers: { "Authorization": `bearer ${token}`, "Cache-Control": "no-cache" },
                body: formData
            });
            if (response.ok) {
                reloadDisplay()
                document.getElementById("form-add").reset()
                const file = document.getElementById("input-img")
                file.value = ''
                document.querySelector(".form-file-selected-info img").src = "/assets/icons/picture-svgrepo-com.png"
                document.getElementsByClassName("form-file-placeholder")[0].classList.remove("invisible")
                document.querySelector(".form-container-image p").classList.remove("invisible")
                const infoDeleteModale = document.getElementById("info-modale-add")
                infoDeleteModale.innerText = "ajout réussi"
                setTimeout(function () {
                    infoDeleteModale.innerText = "";
                }, 2000);
            }
            else {
                throw new Error(response)
            }
        } catch (error) {
            const infoModale = document.getElementById("info-modale-add")
            erreur(infoModale, error)
        }
    }
}
function logOut() {
    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        document.location.href = "index.html"
    })
}

//Function to delete a work
function deleteWork(token) {
    const workButton = document.querySelectorAll("#work-to-delete article button")
    for (let i = 0; i < workButton.length; i++) {
        workButton[i].addEventListener("click", async function () {

            const id = workButton[i].dataset.id
            // Calling the fetch function with all the necessary information.
            try {
                const response = await fetch(`https://back-p3-oc.onrender.com/api/works/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `bearer ${token}` },

                });
                if (response.ok) {
                    console.log(response)
                    reloadDisplay()
                    const infoDeleteModale = document.getElementById("info-modale-delete")
                    infoDeleteModale.innerText = "suppression réussi"
                    setTimeout( () => {
                        infoDeleteModale.innerText = "";
                    }, 2000);

                }
                else {
                    console.error(response)
                    throw new Error(response)

                }
            } catch (error) {
                const infoModale = document.getElementById("info-modale-delete")
                erreur(infoModale, error)
            }
        })
    }
}
//Function to know if we enable  or disable the submit button
function setSubmitButton() {
    const inputImg = document.getElementById("input-img");
    const workName = document.getElementById("work-name");
    const category = document.getElementById("category");
    const formAdd = document.getElementById("form-add");
    checkInputs()
    handleInput()

    function checkInputs() {
        const imgStatus = inputImg.value !== "";
        if (imgStatus === false){
            document.getElementsByClassName("info-img")[0].innerText ="valeur requise"
        }
        else {
            document.getElementsByClassName("info-img")[0].innerText =""
        }
        const nameStatus = /[a-zA-Z]+/.test(workName.value);

        if (nameStatus === false){
            document.getElementsByClassName("info-text")[0].innerText ="valeur requise"
        }
        else{
            document.getElementsByClassName("info-text")[0].innerText =""
        }
        const categoryStatus = category.value !== "nothing";
        if (categoryStatus === false){
            document.getElementsByClassName("info-category")[0].innerText ="valeur requise"
        }
        else{
            document.getElementsByClassName("info-category")[0].innerText =""
        }
        return imgStatus && nameStatus && categoryStatus;
    }

    function handleInput() {
        const isDisabled = !checkInputs();
        disableSubmit(isDisabled);
    }
    
    inputImg.addEventListener("input", handleInput);
    workName.addEventListener("input", handleInput);
    category.addEventListener("input", handleInput);
    formAdd.addEventListener("input", handleInput);
}


//Function to disable or enable the send button
function disableSubmit(disabled) {
    if (disabled === true) {
        document
            .getElementById("button-submit-add")
            .setAttribute("disabled", true);
    } else {
        document
            .getElementById("button-submit-add")
            .removeAttribute("disabled");
    }
}

// Function to refresh the display after deletion or addition.
async function reloadDisplay() {
    try {
        const response = await fetch("https://back-p3-oc.onrender.com/api/works")
        if (response.ok) {
            const token = localStorage.getItem('token')
            const tokenUsabled = JSON.parse(token)
            const article = await response.json()
            generateArticle(article)
            generateArticleInTheModale(article)
            deleteWork(tokenUsabled)
        } else {
            throw new Error(response);
        }
    } catch (error) {
        const infoModale = document.getElementById("info-edit-page")
        erreur(infoModale, error)

    }

}

function erreur(info, error) {
    if (error.message === "Failed to fetch") {
        info.innerText = "Erreur API"
        setTimeout(function () {
            info.innerText = "";
        }, 10000);
        console.log(info.innerText)
    }
    else {
        info.innerText = error.message;
        setTimeout(function () {
            info.innerText = "";
        }, 10000);
        console.log(info.innerText)
    }
}



// Process function.
async function process() {
    try {
        const response = await fetch("https://back-p3-oc.onrender.com/api/works");
        const askCategory = await fetch("https://back-p3-oc.onrender.com/api/categories");
        if (response.ok && askCategory.ok) {
            const article = await response.json();
            const category = await askCategory.json();
            const token = localStorage.getItem('token')
            document.getElementById("input-img").addEventListener("change", (e) => {
                readURL(e)
            });
            if (!token) {
                document.location.href = "login-page.html"
                alert("vous n'êtes pas connecté")
            }
            else {
                const tokenUsabled = JSON.parse(token)
                displayModal()
                generateArticle(article)
                generateArticleInTheModale(article)
                deleteWork(tokenUsabled)
                sendNewWork(category, tokenUsabled)
                logOut()
            }
        }
    }
    catch (error) {
        const infoModale = document.getElementById("info-edit-page")
        erreur(infoModale, error)
    }
}

process()