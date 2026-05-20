let loadingTimer1;
let loadingTimer2;
let loadingSession = 0;

// switch screens hewhe
function goToScreen(screenID) {
  document.querySelectorAll(".screen, #loading-screen").forEach(screen => {
    screen.classList.remove("active");
  });

  // reset special elements
  resetDogDrawing();

  // show selected screen
  const targetScreen = document.getElementById(screenID);

  if (targetScreen) {
    targetScreen.classList.add("active");
  }
}

// reset loading screen text
function resetLoading() {
  document.getElementById("loading-txt-A").classList.remove("hidden");
  document.getElementById("loading-txt-B").classList.add("hidden");
}

function startLoadingSequence(nextScreen = "intro-screen") {
  loadingSession++;
  const currentSession = loadingSession;

  // show loading screen
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById("loading-screen").classList.add("active");

  resetLoading();

  clearTimeout(loadingTimer1);
  clearTimeout(loadingTimer2);

  // swap loading text
  loadingTimer1 = setTimeout(() => {
    if (currentSession !== loadingSession) return;

    document.getElementById("loading-txt-A").classList.add("hidden");
    document.getElementById("loading-txt-B").classList.remove("hidden");
  }, 2500);

  // move to next screen
  loadingTimer2 = setTimeout(() => {
    if (currentSession !== loadingSession) return;

    goToScreen(nextScreen);
  }, 6000);
}

window.onload = () => {
  startLoadingSequence("intro-screen");
};

let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function showSlides(n) {
  const slides = document.getElementsByClassName("pic-slides");

  // loop to start
  if (n > slides.length) {
    slideIndex = 1;
  }

  // loop to end
  if (n < 1) {
    slideIndex = slides.length;
  }

  // hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // show current slide
  slides[slideIndex - 1].style.display = "block";
}
function wiggleImage(el) {
  el.classList.remove("wiggle"); // reset

  // force reflow so animation can restart
  void el.offsetWidth;

  el.classList.add("wiggle");
}

function showDogDrawing() {
  const drawing = document.getElementById("dog-drawing");
  const button = document.querySelector("#dog-drawing-container button");
  drawing.classList.remove("hidden");
  button.style.display = "none";
}
function resetDogDrawing() {
  const drawing = document.getElementById("dog-drawing");
  const button = document.querySelector("#dog-drawing-container button");
  drawing.classList.add("hidden");
  drawing.classList.remove("show");
  button.style.display = "inline-block";
}

let musicBoxOpen = false;
function toggleMusicBox() {
  const musicBoxImg = document.getElementById("music-box-img");
  const musicBoxAudio = document.getElementById("music-box-audio");

  if (!musicBoxOpen) {
    musicBoxImg.src = "images/music-box-open.png";
    musicBoxAudio.play();
    musicBoxOpen = true;
  } else {
    musicBoxImg.src = "images/music-box-closed.png";
    musicBoxAudio.pause();
    musicBoxOpen = false;
  }
}
function closeMusicBoxScreen() {

  const musicBoxImg = document.getElementById("music-box-img");
  const musicBoxAudio = document.getElementById("music-box-audio");

  // stop audio
  musicBoxAudio.pause();

  // reset song to beginning
  musicBoxAudio.currentTime = 0;

  // reset image
  musicBoxImg.src = "images/music-box-closed.png";

  // reset state
  musicBoxOpen = false;

  // leave screen
  goToScreen("gift-screen");
}