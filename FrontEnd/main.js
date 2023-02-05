let article = window.localStorage.getItem("article");

if (article === null) {
    // Récupération des pièces depuis l'API
    const reponse = await fetch("http://localhost:5678/api/works");
    article = await reponse.json();
    // Transformation des pièces en JSON
    const valeurArticle = JSON.stringify(article);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("article", valeurArticle);
} else {
    article = JSON.parse(article);
}

function genererArticle(article) {
    for (let i = 0; i < article.length; i++) {
        const tabarticle = article[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".gallery");
        // Création d’une balise dédiée à une image
        const articleElement = document.createElement("artcile");

        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.crossOrigin = "anonymous";
        imageElement.src = tabarticle.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = tabarticle.title;

        console.log(articleElement)

        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(articleElement);
        articleElement.appendChild(imageElement);
        articleElement.appendChild(nomElement);
    }
}

genererArticle(article)

const boutonAll = document.querySelector("#btn-all");
boutonAll.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererArticle(article)
});


const boutonObject = document.querySelector("#btn-objets");

boutonObject.addEventListener("click", function () {
    const objetsFiltrees = article.filter(function (article) {
        return article.category.name === 'Objets';
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticle(objetsFiltrees);
});

const boutonAppartements = document.querySelector("#btn-Appartements");

boutonAppartements.addEventListener("click", function () {
    const AppartementsFiltrees = article.filter(function (article) {
        return article.category.name === 'Appartements';
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticle(AppartementsFiltrees);
});

const boutonHotelRestaurants = document.querySelector("#btn-Htl-Res");
boutonHotelRestaurants.addEventListener("click", function () {
    const HotelRestaurantsFiltrees = article.filter(function (article) {
        return article.category.name === "Hotels & restaurants";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererArticle(HotelRestaurantsFiltrees);
});


