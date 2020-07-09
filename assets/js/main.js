let slides = document.querySelectorAll('.slide');
let pausePlayBtn = document.querySelector('#pause-btn');
let currentSlide = 0;
let timerId = null;
let isPlayning = true;



function nextSlide() {
    slides[currentSlide].classList.toggle('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.toggle('active');
};

timerId = setInterval(nextSlide, 2000);

function play () {
    timerId = setInterval(nextSlide, 2000);
    pausePlayBtn.innerHTML = 'Pause';
    isPlayning = !isPlayning;
};

function pause() {
    clearInterval(timerId);
    pausePlayBtn.innerHTML = 'Play';
    isPlayning = !isPlayning;
};
function pausePlay() {
    if (isPlayning) pause();
    else play();
};

pausePlayBtn.addEventListener('click', pausePlay);


