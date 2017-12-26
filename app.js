const player = document.querySelector('.player');
const video = player.querySelector('.video_player');
const progress = player.querySelector('.progress');
const progressBar = progress.querySelector('#progress');
const toggle = player.querySelector('.toggle-btn');
const toggleIcon = toggle.querySelector('.icon');
const muteButton = player.querySelector('.mute-btn');
const stopButton = player.querySelector('.stop-btn');
const skipButtons = player.querySelectorAll('.skip-btn');

// fallback for browsers with no video player support
let supportsProgress = (document.createElement('progress').max !== undefined);
if (!supportsProgress) progress.setAttribute('data-state', 'fake');

video.addEventListener( "loadedmetadata", function (e) {
    let videoHeight = this.clientHeight - 67;   
    player.querySelector('.player_controls').style.marginTop = videoHeight + "px";

    let browserWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;        
    console.log(browserWidth);
    let videoWidth = 820 || this.videoWidth;
    console.log(videoWidth);
    let margin = videoWidth > browserWidth ? 0 : (browserWidth - videoWidth) /2;
    console.log(margin);    
    player.style.marginLeft = margin + "px";
}, false );



function togglePlay(){
    if(video.paused) video.play();
    else video.pause();
}

function updateToggleStatus(){    

    if(this.paused){
        toggleIcon.classList.remove('ion-pause');
        toggleIcon.classList.add('ion-play');
    } else {        
        toggleIcon.classList.remove('ion-play');
        toggleIcon.classList.add('ion-pause');
    }        
}

function skip(){    
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;    
    progressBar.value = percent;
}

function seek(e){
    const seekTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = seekTime;
}

function stop(){
    video.pause();
    video.currentTime = 0;
}


video.addEventListener('click',  togglePlay);
video.addEventListener('play',  updateToggleStatus);
video.addEventListener('pause',  updateToggleStatus);
video.addEventListener('stop',  stop);
video.addEventListener('timeupdate',  handleProgress);

toggle.addEventListener('click',  togglePlay);
stopButton.addEventListener('click',  stop );
muteButton.addEventListener('click',  () => video.muted = !video.muted );


skipButtons.forEach(button => button.addEventListener('click', skip));


progress.addEventListener('click', seek);
let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && seek(e) );