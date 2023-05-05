const songs = [
    { name: "Rhiannon, Fleetwood Mac", songpath: "/songs/1.mp3", coverpath: "/covers/1.jpg"  ,duration:"3:50"},
    { name: "Eleanor Rigby,The Beatles.", songpath: "/songs/2.mp3", coverpath: "/covers/2.jpg"  ,duration:"2:33"},
    { name: "Runaround Sue,Dion.", songpath: "/songs/3.mp3", coverpath: "/covers/3.jpg"  ,duration:"4:33"},
    { name: "Good 4 U", songpath: "/songs/4.mp3", coverpath: "/covers/4.jpg"  ,duration:"4:27"},
    { name: "Don't Play", songpath: "/songs/5.mp3", coverpath: "/covers/5.jpg"  ,duration:"3:28"},
    { name: "Never say never", songpath: "/songs/6.mp3", coverpath: "/covers/6.jpg"  ,duration:"3:28"},
    { name: "Roar", songpath: "/songs/7.mp3", coverpath: "/covers/7.jpg"  ,duration:"4:33"},
    { name: "Shake it off", songpath: "/songs/8.mp3", coverpath: "/covers/8.jpg"  ,duration:"3:50"},
    { name: "Get out my head", songpath: "/songs/9.mp3", coverpath: "/covers/9.jpg"  ,duration:"3:28"},
    { name: "Paradise",songpath:"/songs/10.mp3",coverpath: "/covers/10.jpg" ,duration:"4:00" }
]


let songitem = Array.from(document.getElementsByClassName("songitem"));
let index=0;
let small_play_btn = Array.from(document.getElementsByClassName('small-play-btn'));
small_play_btn[0].classList.add("currentpausebtn");
let audioElement = new Audio("/songs/1.mp3");
let backwardbtn = document.getElementById('backward');
let masterplay = document.getElementById("play");
let forwardbtn = document.getElementById('forward');
let progressbar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let icongif=Array.from(document.getElementsByClassName('icongif'));
let bottomdetailsong = document.getElementById('bottomdetailsong');
let currentsongtime=document.getElementsByClassName('currenttime');
let totalsongduration=document.getElementsByClassName('totalsongduration');

songitem.forEach((element, i) => {
    element.getElementsByTagName('img')[1].src = songs[i].coverpath;
    element.getElementsByTagName('span')[0].innerText = songs[i].name;
    element.getElementsByClassName('songduration')[0].innerText=songs[i].duration;
})

function detectprevioussong(){
    for (let i = 0; i < songs.length; i++) {
        if ("http://127.0.0.1:5500" + songs[i].songpath == audioElement.src) {
                previndex=i;
            }
        }
    }


function change_songicon_of_songlist() {
    for (let i = 0; i < songs.length; i++) {
        if ("http://127.0.0.1:5500" + songs[i].songpath == audioElement.src) {
            console.log("elemnet found");
            if (audioElement.paused) {
                document.getElementById(`${i}`).classList.remove('currentpausebtn');
                document.getElementById(`${i}`).classList.remove('fa-circle-play');
                document.getElementById(`${i}`).classList.add('fa-pause-circle');
                icongif[i].style.opacity=1;
            }
            else {
                document.getElementById(`${i}`).classList.remove('fa-pause-circle');
                document.getElementById(`${i}`).classList.add('fa-circle-play');
                document.getElementById(`${i}`).classList.add('currentpausebtn');
                icongif[i].style.opacity=0;
            }
        }
    }
}


masterplay.addEventListener('click', () => {
    detectprevioussong();
    if (audioElement.paused) {
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        change_songicon_of_songlist();
        audioElement.play();
    }
    else {
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        change_songicon_of_songlist();
        audioElement.pause();
    }
})

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressbar.value = progress;
})

progressbar.addEventListener('change', () => {
    audioElement.currentTime = progressbar.value * audioElement.duration / 100;
})

const makeAllPlay = () => {
    small_play_btn.forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-circle-play');
        element.classList.remove('currentpausebtn');
    })
}

small_play_btn.forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        index = parseInt(e.target.id);
        detectprevioussong();
        if (e.target.classList.contains('fa-circle-play')) {
            makeAllPlay();
            e.target.classList.remove('currentpausebtn');
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `/songs/${index + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-pause-circle');
            bottomdetailsong.innerText = songs[index].name;
            if (gif.style.opacity == 0){    
                gif.style.opacity = 1;
                icongif[index].style.opacity=1;
                // icongif[previndex].style.opacity=0;
            }
            else {
                gif.style.opacity = 0;
                icongif[index].style.opacity=0;
                icongif[previndex].style.opacity=0;
                setTimeout(() => {
                    gif.style.opacity = 1;
                    icongif[index].style.opacity=1;
                }, 400);

            }
        }
        else
            if (e.target.classList.contains('fa-pause-circle')) {
                e.target.classList.add('currentpausebtn');
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-circle-play');
                audioElement.pause();
                masterplay.classList.remove('fa-pause-circle');
                masterplay.classList.add('fa-circle-play');
                gif.style.opacity = 0;
                icongif[index].style.opacity=0;
            }

    })
})

backwardbtn.addEventListener('click',()=>{
    if(index==0){
        previndex=index;
        index=9;
    }
    else  { 
        previndex=index;
        index-=1;
    }
    audioElement.pause();
    audioElement.currentTime=0;
    audioElement.src=`/songs/${index+1}.mp3`;
    audioElement.play();
    bottomdetailsong.innerText=songs[index].name;

    if (masterplay.classList.contains('fa-circle-play')) {
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        icongif[previndex].style.opacity=0;
        icongif[index].style.opacity=1;
    }
    else {
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        icongif[previndex].style.opacity=0;
        icongif[index].style.opacity=0;
        setTimeout(() => {
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            icongif[index].style.opacity=1;
        }, 200);
    }

    makeAllPlay();
     small_play_btn[index].classList.remove('fa-circle-play');
     small_play_btn[index].classList.add('fa-pause-circle');
    previndex=index;

})

forwardbtn.addEventListener('click',()=>{
    if(index==9){
        previndex=index;
        index=0;
    }
    else {  
        previndex=index;
        index+=1;
    }
    audioElement.pause();
    audioElement.currentTime=0;
    audioElement.src=`/songs/${index+1}.mp3`;
    audioElement.play();
    bottomdetailsong.innerText=songs[index].name;

    if (masterplay.classList.contains('fa-circle-play')) {
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        icongif[previndex].style.opacity=0;
        icongif[index].style.opacity=1;
    }
    else {
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        icongif[previndex].style.opacity=0;
        icongif[index].style.opacity=0;
        setTimeout(() => {
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            icongif[index].style.opacity=1;
        }, 200);
    }

    makeAllPlay();
    small_play_btn[index].classList.remove('fa-circle-play');
     small_play_btn[index].classList.add('fa-pause-circle');
    previndex=index;
})