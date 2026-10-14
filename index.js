const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('imgFullscreen');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const images = document.querySelectorAll('.image');
let currentIndex = 0;





// Funktion fürs Öffnen des Modals mit bestimmten Index
function openModal(index) {
    currentIndex = index;
    modal.style.display = 'flex';
    modalImg.src = images[currentIndex].src;
    modalImg.alt = images[currentIndex].alt;
}

/// Bilder durchlaufen und Klick-Event hinzufügen
images.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));    
});

//Vorwärts/Rückwärts navigation
function showNext() {
    let nextIndex = (currentIndex + 1) % images.length;
    openModal(nextIndex);
}

function showPrev() {
    let prevIndex = (currentIndex - 1 + images.length) % images.length;
    openModal(prevIndex);
}

// Klick-Events für UI-Pfeile
nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); })
prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); })

// Event-Listeners für die physischen Pfeil Tasten
document.addEventListener('keydown', function(event) {
    if (modal.style.display === 'flex') {
        if (event.key === 'ArrowRight') showNext();
        if (event.key === 'ArrowLeft') showPrev();
        if (event.key === 'Escape') modal.style.display = 'none';
    }
});

/*
// Automatische Helligkeitsanpassung 
modalImg.addEventListener('load', () => {
    const brightness = getImageBrightness(modalImg);

    // Schwellwert: 128 (Mitte von 0-255)
    // Höher = helles Bild -> schwarze Pfeile / Niederiger = dunkles Bild -> weiße Pfeile
    const color = brightness > 128 ? 'black' : 'white';

    prevBtn.style.color = color;
    nextBtn.style.color = color;
    closeBtn.style.color = color;
});


// Durchschnittliche Helligkeit vom Bild über unsichtbares Canvas berechnen
function getImageBrightness(imgElement) {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Starke verkleinerung des Bildes im Speicher für schnellere Berechnung 
        canvas.width = 50;
        canvas.height = 50;

        ctx.drawImage(imgElement, 0, 0, 50, 50);

        const imageData = ctx.getImageData(0, 0, 50, 50);
        const data = imageData.data;
        let r, g, b, avg;
        let colorSum = 0;

        for (let x = 0, len = data.length; x < len; x += 4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            // Standart Helligkeitsformel
            avg = Math.floor((r * 299 + g * 587 + b * 114) / 1000);
            colorSum += avg;
        }

        return Math.floor(colorSum / (canvas.width * canvas.height));
    } catch (e) {
        // Falls CORS Fehler auftretten fallen wir standart gemäss auf weiß zurück
        return 0;
    }
}
*/

// Schließen Logik
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});