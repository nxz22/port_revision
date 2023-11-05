// index.html's Hidden Content (Scroll to Discover More)
window.addEventListener("scroll", function() {
    let hiddenContent = document.querySelector(".hidden-content");
    let scrollPrompt = document.querySelector(".scroll-prompt");

    if (window.pageYOffset > 200) { 
        hiddenContent.style.opacity = "1";
        hiddenContent.style.transform = "translateY(0)";

        scrollPrompt.style.opacity = "0";
        scrollPrompt.style.transition = "opacity 0.5s";
    }
}); 

//Music Player Play/Pause
document.addEventListener('DOMContentLoaded', function () {
    const playPauseButton = document.getElementById('playPauseButton');
    const musicBar = document.getElementById('musicBar');
    const cdElement = document.getElementById('cdElement');
    const rotatingImage = cdElement.querySelector('img');
    const songTitle = document.getElementById('songTitle');
  
    // Initialize the player state
    let isPlaying = !musicBar.paused;
    
    function updateUI() {
        const musicPrefix = document.querySelector('.music-prefix');
        
        if (isPlaying) {
          rotatingImage.style.animationPlayState = 'running';
          musicPrefix.textContent = "Now Playing"; // This text is updated based on the state
          playPauseButton.src = 'assets/static/pause.png'; // Path to your pause button image
          musicBar.play();
        } else {
          rotatingImage.style.animationPlayState = 'paused';
          musicPrefix.textContent = "Music Paused"; // This text is updated based on the state
          playPauseButton.src = 'assets/static/play.png'; // Path to your play button image
          musicBar.pause();
        }
    }
      
      
    // Event listener for play/pause button click
    playPauseButton.addEventListener('click', function() {
      isPlaying = !isPlaying;
      updateUI();
    });
  
    // Event listener for music playing
    musicBar.addEventListener('play', function() {
      isPlaying = true;
      updateUI();
    });
  
    // Event listener for music pausing
    musicBar.addEventListener('pause', function() {
      isPlaying = false;
      updateUI();
    });
  
    // Load the initial UI state
    updateUI();
  
    // Save the player state before the window unloads
    window.addEventListener('beforeunload', function() {
      localStorage.setItem('isPlaying', isPlaying);
      localStorage.setItem('lastTime', musicBar.currentTime);
      localStorage.setItem('lastSrc', musicBar.src);
    });
  
    // Load the last state if available
    window.addEventListener('load', function() {
      let lastTime = parseFloat(localStorage.getItem('lastTime')) || 0;
      let lastSrc = localStorage.getItem('lastSrc') || musicBar.src;
      
      if (lastSrc === musicBar.src) {
        musicBar.currentTime = lastTime;
      }
      // If `isPlaying` was stored as true, play the music
      if (localStorage.getItem('isPlaying') === 'true') {
        musicBar.play();
      }
    });
  });
  
//Mobile Buton
function toggleMenu() {
    var menu = document.getElementById("mobileFullscreenMenu");
    var menuButtonImage = document.getElementById("mobileMenuButton").querySelector("img");

    if (menu.classList.contains("show")) {
        menu.classList.remove("show");
        setTimeout(function() {
            menu.style.display = 'none';
        }, 500); 
        menuButtonImage.src = "assets/static/mb_menu.png";
    } else {
        menu.style.display = "flex";
        menu.offsetWidth;
        menu.classList.add("show");
        menuButtonImage.src = "assets/static/mb_back.png";
    }
}


//Fade in/out Transition
window.addEventListener("load", function () {
    const fadeInElements = document.querySelectorAll(".fade-in");
    fadeInElements.forEach(function (element) {
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
    });

    const fadeDownElements = document.querySelectorAll(".fade-down");
    fadeDownElements.forEach(function (element) {
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
    });
});


//Navigation Bar
function dragElement(element, handle) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    handle.onmousedown = dragMouseDown;
  
    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // set the element's new position:
        var newLeft = element.offsetLeft - pos1;
        var newTop = element.offsetTop - pos2;
        
        // Get the boundaries of the window
        var winWidth = window.innerWidth;
        var winHeight = window.innerHeight;
        
        var elemWidth = element.offsetWidth;
        var elemHeight = element.offsetHeight;
        
        // Check if the new position is within the viewport and adjust if not
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + elemWidth > winWidth) newLeft = winWidth - elemWidth;
        if (newTop + elemHeight > winHeight) newTop = winHeight - elemHeight;
        
        element.style.left = newLeft + "px";
        element.style.top = newTop + "px";
      }
      
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }


var menuContainer = document.getElementById("menuContainer");
var dragHandle = menuContainer.querySelector('.drag-handle');
dragElement(menuContainer, dragHandle);


var musicContainer = document.querySelector(".music-container");
var musicDragHandle = musicContainer.querySelector('.drag-handle');
dragElement(musicContainer, musicDragHandle);