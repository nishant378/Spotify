console.log("Welcome to Spotify");

let songIndex=0;
let audioElement= new Audio("songs/1.mp3");

let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let masterSongName=document.getElementById("masterSongName");
let gif=document.getElementById("gif");

let songs=[
    { songName:"In The End -Linkin Park",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    { songName:"Numb -Linkin Park",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    { songName:"Somewhere I belong -Linkin Park",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    { songName:"Let me love you - Justin Bieber",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"}
]

let songItems=Array.from(document.getElementsByClassName("songItem"));





songItems.forEach((element,i)=>
{
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
//handle play/pause click
masterPlay.addEventListener('click',()=>
{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity=0;
    }
});


//listen to progress bar event
audioElement.addEventListener('timeupdate',()=>
{
       //update seekbar
       progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
       myProgressBar.value=progress;
});

myProgressBar.addEventListener('change',()=>
{
    audioElement.currentTime=(myProgressBar.value * audioElement.duration)/100;
})


const makeAllPlays=()=>
{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.add("fa-play-circle");
        element.classList.remove("fa-pause-circle");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
         makeAllPlays();
         songIndex=parseInt(e.target.id);
         e.target.classList.remove("fa-play-circle");
         e.target.classList.add("fa-pause-circle");
         masterSongName.innerText=songs[songIndex].songName;
         audioElement.currentTime=0;
         audioElement.src=`songs/${songIndex+1}.mp3`;
         audioElement.play();
         masterPlay.classList.remove("fa-play-circle");
         masterPlay.classList.add("fa-pause-circle");
         gif.style.opacity=1;
    })
})

document.getElementById("next").addEventListener('click',()=>
{
    if(songIndex>=3)
    {
        songIndex=0;
    }
    else
    {
        songIndex+=1;
    }
    audioElement.currentTime=0;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity=1;
})


document.getElementById("previous").addEventListener('click',()=>
{
    if(songIndex<=0)
    {
        songIndex=0;
    }
    else
    {
        songIndex-=1;
    }
    audioElement.currentTime=0;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity=1;
})












