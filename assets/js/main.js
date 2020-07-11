function Carousel() {

    this.container = document.querySelector('#carousel');
    this.controlsContainer = document.querySelector('.controls');
    this.indicatorsContainer = document.querySelector('.indicators');
    this.indicators = document.querySelectorAll('.indicator');
    this.slides = document.querySelectorAll('.slide');
    this.pausePlayBtn = document.querySelector('#pause');
    this.nextBtn = document.querySelector('#next');
    this.prevBtn = document.querySelector('#prev');

    this.interval = 5000;
    this.currentSlide = 0;
    this.slideLength = this.slides.length;
    this.timerId = null;
    this.isPlaying = true;
    this.swipeStartX = null;
    this.swipeEndX = null;

    this.LEFT_ARROW = 'ArrowLeft';
    this.RIGHT_ARROW = 'ArrowRight';
    this.SPACE = ' ';
    this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="far fa-play-circle"></i>';

};

Carousel.prototype = {
    gotoNth(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this. currentSlide = (n + this.slideLength) % this.slideLength;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    },

    gotoNext() {
        this.gotoNth(this.currentSlide + 1);
    },

    gotoPrev() {
        this.gotoNth(this.currentSlide - 1);
    },

    play() {
        this.timerId = setInterval(this.gotoNext, this.interval);
        this.pausePlayBtn.innerHTML = this.FA_PAUSE;
        this.isPlaying = !this.isPlaying;
    },

    pause() {
        if (this.isPlaying) {
            clearInterval(this.timerId);
            this.pausePlayBtn.innerHTML = this.FA_PLAY;
            this.isPlaying = !this.isPlaying;
        }
    },

    pausePlay() {
        if (this.isPlaying) this.pause();
        else this.play();
    },

    next() {
        this.pause();
        this.gotoNext();
    },

    prev() {
        this.pause();
        this.gotoPrev();
    },

    indicator (e) {
        let target = e.target;
        if (target.classList.contains('indicator')){
            this.pause();
            this.gotoNth(+target.getAttribute(('data-slider-to')));
        }
    },

    pressKey (e) {
        if (e.key === this.LEFT_ARROW) this.prev();
        if (e.key === this.RIGHT_ARROW) this.next();
        if (e.key === this.SPACE) this.pausePlay();
    },

    swipeStart (e) {
        this.swipeStartX = e.changedTouches[0].pageX;
    },

    swipeEnd (e) {
        this.swipeEndX = e.changedTouches[0].pageX;
        this.swipeStartX - this.swipeEndX < -100 && this.prev();
        this.swipeStartX - this.swipeEndX > 100 && this.next();
    },

    setListeners() {
        this.pausePlayBtn.addEventListener('click', this.pausePlay.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.indicatorsContainer.addEventListener('click', this.indicator.bind(this));
        document.addEventListener('keydown', this.pressKey.bind(this));
        this.container.addEventListener('touchstart', this.swipeStart.bind(this));
        this.container.addEventListener('touchend', this.swipeEnd.bind(this));
    },

    init() {
        this.setListeners();
        this.timerId = setInterval(() => {
            this.gotoNext();
        },  this.interval);
    }
};

let carousel = new Carousel();

carousel.init();