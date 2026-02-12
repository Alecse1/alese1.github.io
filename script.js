const slider = document.getElementById("slider");
let currentIndex = 0;
const totalSlides = 9;
const finalMusic = document.getElementById("finalMusic");
const muteBtn = document.getElementById("muteBtn");


// Vibration safe
function vibrate(duration = 30) {
    if (navigator.vibrate) navigator.vibrate(duration);
}

// // Slide navigation
// function goToSlide(index) {
//     if (index < 0 || index >= totalSlides) return;
//     currentIndex = index;
//     slider.style.transform = "translateX(-" + (currentIndex * 100) + "vw)";

//     if (currentIndex === 8) { // Slide 9
//       startMusic();
//       muteBtn.style.display = "block";
//     } else {
//       stopMusic();
//       muteBtn.style.display = "none";
//     }
// }

function setupButton(button, targetSlide) {

    // Desktop
    button.addEventListener("mousedown", () => {
        button.src = button.dataset.down;
        button.classList.add("pressed");
        vibrate(40);
    });

    button.addEventListener("mouseup", () => {
        button.src = button.dataset.up;
        button.classList.remove("pressed");
        goToSlide(targetSlide);
    });

    button.addEventListener("mouseleave", () => {
        button.src = button.dataset.up;
        button.classList.remove("pressed");
    });

    // Mobile
    button.addEventListener("touchstart", (e) => {
        button.src = button.dataset.down;
        button.classList.add("pressed");
        vibrate(40);
        e.preventDefault();
    });

    button.addEventListener("touchend", (e) => {
        button.src = button.dataset.up;
        button.classList.remove("pressed");
        goToSlide(targetSlide);
        e.preventDefault();
    });
}


// Initialize all buttons
document.querySelectorAll(".btn").forEach(button => {
    const target = parseInt(button.dataset.target);
    setupButton(button, target);
});


function startMusic() {

    if (!finalMusic.paused) return;

    finalMusic.loop = true;
    finalMusic.volume = 0;
    finalMusic.play().catch(() => {});

    let fade = setInterval(() => {
        if (finalMusic.volume < 0.8) {
            finalMusic.volume += 0.05;
        } else {
            clearInterval(fade);
        }
    }, 200);
}


function stopMusic() {
    finalMusic.pause();
    finalMusic.currentTime = 0;
}


muteBtn.addEventListener("click", () => {

    if (finalMusic.muted) {
        finalMusic.muted = false;
        muteBtn.src = muteBtn.dataset.unmuted;
    } else {
        finalMusic.muted = true;
        muteBtn.src = muteBtn.dataset.muted;
    }

});

function setRealHeight() {
    const vh = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;

    document.querySelectorAll(".screen").forEach(screen => {
        screen.style.height = vh + "px";
    });

    document.querySelector(".slider").style.height = vh + "px";
}


setRealHeight();

window.addEventListener("resize", setRealHeight);

if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", setRealHeight);
}

