// first steps: 1. get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');



// first steps: 2. build our functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

// we need to update the buttton symbol when we pause or play the video
function updateButton() {
    // store the icons on variable
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    // assing the content icon to toggle
    toggle.textContent = icon
}

function skip() {
    // console log to see if event is triggering
    console.log(this.dataset.skip);
    // we parse float because the number is a string from the dom
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;

    // update css yellow bar
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    // offsetX is where the user clicks - offsetX is provided by the dom
    // offsetWidth is the width of the video - offsetWidth is provided by the dom
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;

    video.currentTime = scrubTime;
}



// first steps: 3. hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


togglePlay.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

// we use change instead of click because we hold and drag the slider
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
