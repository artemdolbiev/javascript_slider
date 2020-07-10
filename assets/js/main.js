let container = document.querySelector('#carousel');
let controlsContainer = document.querySelector('.controls');
let slides = document.querySelectorAll('.slide');
let pausePlayBtn = document.querySelector('#pause');
let nextBtn = document.querySelector('#next');
let prevBtn = document.querySelector('#prev');
let indicatorsContainer = document.querySelector('.indicators');
let indicators = document.querySelectorAll('.indicator');

let currentSlide = 0;
let timerId = null;
let isPlaying = true;
let slideLength = slides.length;
let swipeStart = null;
let swipeEnd = null;

const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const SPACE = ' ';
const FA_PAUSE = 'far fa-pause-circle';
const FA_PLAY = 'far fa-play-circle';




function gotoNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + slideLength)% slideLength;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
};

function gotoNext () {
    gotoNth(currentSlide + 1);
};

function gotoPrev () {
    gotoNth(currentSlide - 1);
};

function play () {
    timerId = setInterval(gotoNext, 5000);
    pausePlayBtn.innerHTML = 'FA_PAUSE';
    isPlaying = !isPlaying;
};

function pause () {
    if (isPlaying) {
        clearInterval(timerId);
        pausePlayBtn.innerHTML = 'FA_PLAY';
        isPlaying = !isPlaying;
    }
};
function pausePlay () {
    if (isPlaying) pause();
    else play();
};

function next () {
    pause();
    gotoNext();
};
function prev () {
    pause();
    gotoPrev();
};

function indicate (e) {
    let target = e.target;
    if (target.classList.contains('indicator')){
        pause();
        gotoNth(+target.getAttribute(('data-slider-to')));
    };
};

function pressKey (e) {
    if (e.key === LEFT_ARROW) prev();
    if (e.key === RIGHT_ARROW) next();
    if (e.key === SPACE) pausePlay();
};

function swipeStart (e) {
    swipeStartX = e.changedTouches[0].pageX;
};

function swipeEnd (e) {
    swipeEndX = e.changedTouches[0].pageX;
    swipeStartX - swipeEndX < -100 && prev();
    swipeStartX - swipeEndX > 100 && next();
};

pausePlayBtn.addEventListener('click', pausePlay);
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
indicatorsContainer.addEventListener('click', indicator);
document.addEventListener('keydown', pressKey);
container.addEventListener('touchstart', swipeStart);
container.addEventListener('toychend', swipeEnd);

timerId = setInterval(gotoNext, 5000);