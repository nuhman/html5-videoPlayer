const player = document.querySelector('.player');
const video = player.querySelector('.video_player');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle-btn');
const skipButtons = player.querySelectorAll('.skip-btn');
const ranges = player.querySelectorAll('.player_slider');

function togglePlay(){
    if(video.paused) video.play();
    else video.pause();
}

function updateToggleStatus(){    
    toggle.textContent = this.paused ? 'PLAY' : 'PAUSE';
}

function skip(){    
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
}

function seek(e){
    const seekTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = seekTime;
}

video.addEventListener('click',  togglePlay);
video.addEventListener('play',  updateToggleStatus);
video.addEventListener('pause',  updateToggleStatus);
video.addEventListener('timeupdate',  handleProgress);

toggle.addEventListener('click',  togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

progress.addEventListener('click', seek);
let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && seek(e) );