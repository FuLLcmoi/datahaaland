document.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.querySelector(".download-button");
    downloadButton.addEventListener("click", function () {
        const fullImage = document.querySelector(".full-image");
        const imageUrl = fullImage.src;

        const downloadLink = document.createElement("a");
        downloadLink.href = imageUrl;
        downloadLink.download = "haaland_image";
        document.body.appendChild(downloadLink);

        downloadLink.click();

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
