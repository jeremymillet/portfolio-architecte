//function to generate article
function generateArticle(article) {

    for (let i = 0; i < article.length; i++) {
        const accArticle = article[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionCards = document.getElementsByClassName("gallery")[0];
        // Création d’une balise dédiée à une image
        const articleElement = document.createElement("article");

        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.crossOrigin = "anonymous";
        imageElement.src = accArticle.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = accArticle.title;

        // On rattache la balise article a la section Fiches
        sectionCards.appendChild(articleElement);
        articleElement.appendChild(imageElement);
        articleElement.appendChild(nomElement);
    }
}
//function to generate filter buttons
function buttonFilter(works) {
    const category = works.reduce(
        (acc, cat) =>
            acc.includes(cat.category.name) ? acc : acc.concat(cat.category.name),
        []
    );
    //loop  the category array
    for (let i = 0; i < category.length; i++) {
        const currentCat = category[i];
        const sectionUl = document.getElementById("btn-list");
        const sectionLi = document.createElement("li");
        const buttonFilter = document.createElement("button");
        buttonFilter.innerText = currentCat;
        buttonFilter.classList.add('btn')
        buttonFilter.addEventListener("click", function () {
            const catWorks = works.filter(function (article) {
                return article.category.name === currentCat;
            })
            document.getElementsByClassName("gallery")[0].innerHTML = "";
            generateArticle(catWorks);
        });
        sectionUl.appendChild(sectionLi);
        sectionLi.appendChild(buttonFilter);
    }
    const buttonFilter = document.getElementsByClassName("all")[0]
    buttonFilter.addEventListener("click", function () {
        document.getElementsByClassName("gallery")[0].innerHTML = "";
        generateArticle(works);
    });
}


// Récupération des données depuis l'API
async function process() {
    // Récupération des données depuis l'API
    try {
        const response = await fetch("https://back-p3-oc.onrender.com/api/works")
        if (response.ok) {
            const works = await response.json();
            generateArticle(works)
            buttonFilter(works)
        } else {
            throw new Error()
        }

    } catch (error) {
        if (error.message === "Failed to fetch") {
           const test= document.getElementById("info")
           test.innerText = "Erreur au chargement de l\'api"
        }
        else{
            console.log(error.message)
        }
    }
}

process()




