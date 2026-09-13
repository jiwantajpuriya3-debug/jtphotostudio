/* =====================================
   JT PHOTO STUDIO
   JAVASCRIPT
===================================== */


/* ==============================
   MOBILE MENU
============================== */

const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {

    menuBtn.addEventListener("click", function () {

        mainNav.classList.toggle("active");

        if (mainNav.classList.contains("active")) {

            menuBtn.innerHTML = "✕";

        } else {

            menuBtn.innerHTML = "☰";

        }

    });


    /* Close menu after clicking link */

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mainNav.classList.remove("active");

            menuBtn.innerHTML = "☰";

        });

    });

}


/* ==============================
   SCROLL REVEAL
============================== */

const revealElements = document.querySelectorAll(
    ".service-box, .portfolio-item, .package-card, .review-card, .about-content, .stats"
);

const revealObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(function (element) {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* ==============================
   CURRENT YEAR
============================== */

const copyright = document.querySelector(".copyright");

if (copyright) {

    const year = new Date().getFullYear();

    copyright.innerHTML =
        "© " + year +
        " JT Photo Studio. All Rights Reserved.";

}


/* ==============================
   PREVENT EMPTY VIEW ALL LINK
============================== */

const viewAll = document.querySelector(".view-all");

if (viewAll) {

    viewAll.addEventListener("click", function (event) {

        event.preventDefault();

        document
            .getElementById("portfolio")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}



/* =====================================
   JT PORTFOLIO — FULLSCREEN GALLERY JS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(
        "#portfolio .portfolio-item"
    );

    const lightbox = document.getElementById(
        "portfolioLightbox"
    );

    const lightboxImage = document.getElementById(
        "lightboxImage"
    );

    const lightboxCaption = document.getElementById(
        "lightboxCaption"
    );

    const closeBtn = document.getElementById(
        "lightboxClose"
    );

    const prevBtn = document.getElementById(
        "lightboxPrev"
    );

    const nextBtn = document.getElementById(
        "lightboxNext"
    );

    let currentIndex = 0;

    function showImage(index) {

        if (!items.length) return;

        currentIndex =
            (index + items.length) % items.length;

        const img = items[currentIndex]
            .querySelector("img");

        const title = items[currentIndex]
            .querySelector(".portfolio-overlay span");

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;

        lightboxCaption.textContent =
            title ? title.textContent : "";

    }

    function openLightbox(index) {

        showImage(index);

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }

    items.forEach((item, index) => {

        item.addEventListener("click", () => {

            openLightbox(index);

        });

    });

    closeBtn.addEventListener(
        "click",
        closeLightbox
    );

    prevBtn.addEventListener(
        "click",
        () => showImage(currentIndex - 1)
    );

    nextBtn.addEventListener(
        "click",
        () => showImage(currentIndex + 1)
    );

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", (e) => {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (e.key === "Escape") {
            closeLightbox();
        }

        if (e.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        }

        if (e.key === "ArrowRight") {
            showImage(currentIndex + 1);
        }

    });

});



/* =====================================
   GALLERY CATEGORY SYSTEM
===================================== */

const galleryData = {

    wedding: {
        title: "WEDDING",
        photos: [
            "images/gallery/wedding/1.jpg",
            "images/gallery/wedding/2.jpg",
            "images/gallery/wedding/3.jpg",
            "images/gallery/wedding/4.jpg",
            "images/gallery/wedding/5.jpg",
            "images/gallery/wedding/6.jpg"
        ]
    },

    couple: {
        title: "COUPLE",
        photos: [
            "images/gallery/couple/1.jpg",
            "images/gallery/couple/2.jpg",
            "images/gallery/couple/3.jpg",
            "images/gallery/couple/4.jpg",
            "images/gallery/couple/5.jpg",
            "images/gallery/couple/6.jpg"
        ]
    },

    bride: {
        title: "BRIDE",
        photos: [
            "images/gallery/bride/1.jpg",
            "images/gallery/bride/2.jpg",
            "images/gallery/bride/3.jpg",
            "images/gallery/bride/4.jpg",
            "images/gallery/bride/5.jpg",
            "images/gallery/bride/6.jpg"
        ]
    },

    prewedding: {
        title: "PRE-WEDDING",
        photos: [
            "images/gallery/prewedding/1.jpg",
            "images/gallery/prewedding/2.jpg",
            "images/gallery/prewedding/3.jpg",
            "images/gallery/prewedding/4.jpg",
            "images/gallery/prewedding/5.jpg",
            "images/gallery/prewedding/6.jpg"
        ]
    },

    details: {
        title: "DETAILS",
        photos: [
            "images/gallery/details/1.jpg",
            "images/gallery/details/2.jpg",
            "images/gallery/details/3.jpg",
            "images/gallery/details/4.jpg",
            "images/gallery/details/5.jpg",
            "images/gallery/details/6.jpg"
        ]
    },

    cinematic: {
        title: "CINEMATIC",
        photos: [
            "images/gallery/cinematic/1.jpg",
            "images/gallery/cinematic/2.jpg",
            "images/gallery/cinematic/3.jpg",
            "images/gallery/cinematic/4.jpg",
            "images/gallery/cinematic/5.jpg",
            "images/gallery/cinematic/6.jpg"
        ]
    }

};


/* OPEN CATEGORY */

function openGallery(category) {

    const data = galleryData[category];

    if (!data) return;

    const categories = document.getElementById("galleryCategories");
    const photosView = document.getElementById("galleryPhotos");

    const title = document.getElementById("categoryTitle");
    const label = document.getElementById("categoryLabel");
    const grid = document.getElementById("galleryPhotoGrid");

    title.textContent = data.title;
    label.textContent = "JT PHOTO STUDIO";

    grid.innerHTML = "";

    data.photos.forEach(photo => {

        const item = document.createElement("div");

        item.className = "gallery-photo";

        item.innerHTML = `
            <img
                src="${photo}"
                alt="${data.title} Photography"
                loading="lazy"
            >
        `;

        grid.appendChild(item);

    });

    categories.style.display = "none";
    photosView.style.display = "block";

    document.getElementById("gallery").scrollIntoView({
        behavior: "smooth"
    });
}


/* CLOSE CATEGORY */

function closeGallery() {

    const categories = document.getElementById("galleryCategories");
    const photosView = document.getElementById("galleryPhotos");

    photosView.style.display = "none";
    categories.style.display = "block";

    document.getElementById("gallery").scrollIntoView({
        behavior: "smooth"
    });
}