document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.gallery-img'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    let currentIndex = 0;

    // Funktion: Lightbox öffnen
    function openLightbox(index) {
        currentIndex = index;
        const currentImg = images[currentIndex];
        lightboxImg.src = currentImg.src;
        lightboxCaption.textContent = currentImg.alt;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
    }

    // Funktion: Lightbox schließen
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
    }

    // Nächstes Bild
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    }

    // Vorheriges Bild
    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(currentIndex);
    }

    // Event Listener für Galerie-Bilder
    images.forEach((img, index) => {
        img.parentElement.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Buttons Klick-Events
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Klick außerhalb des Bildes schließt die Lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Tastatur-Steuerung (Pfeiltasten & ESC)
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'ArrowRight') {
            showNext();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});