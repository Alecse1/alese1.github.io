const slider = document.getElementById("slider");
let currentIndex = 0;
const totalSlides = 9;

// Vibration safe
function vibrate(duration = 30) {
    if (navigator.vibrate) navigator.vibrate(duration);
}

// Slide navigation
function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentIndex = index;
    slider.style.transform = "translateX(-" + (currentIndex * 100) + "vw)";
}

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
