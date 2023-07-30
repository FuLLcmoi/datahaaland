// JavaScript pour la galerie de photos de Haaland

// Ajouter un gestionnaire d'événement au bouton de téléchargement lors du chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.querySelector(".download-button");
    downloadButton.addEventListener("click", function () {
        const fullImage = document.querySelector(".full-image");
        const imageUrl = fullImage.src;

        // Créer un lien de téléchargement
        const downloadLink = document.createElement("a");
        downloadLink.href = imageUrl;
        downloadLink.download = "haaland_image"; // Vous pouvez spécifier ici le nom du fichier à télécharger
        document.body.appendChild(downloadLink);

        // Cliquez sur le lien de téléchargement pour lancer le téléchargement
        downloadLink.click();

        // Supprimer le lien de téléchargement après le téléchargement
        document.body.removeChild(downloadLink);
    });
});

function openImage(element) {
    const fullImageContainer = document.querySelector(".full-image-container");
    const fullImage = fullImageContainer.querySelector(".full-image");
    const downloadButton = fullImageContainer.querySelector(".download-button");

    fullImage.src = element.querySelector("img").src;
    downloadButton.style.display = "block";

    fullImageContainer.style.display = "flex";
}

function closeImage() {
    const fullImageContainer = document.querySelector(".full-image-container");
    fullImageContainer.style.display = "none";
}

function isMobile() {
    return window.innerWidth <= 600;
}