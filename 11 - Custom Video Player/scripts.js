// Get all our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreenButton = player.querySelector("[name='fullscreen']");

// Define all our functionality
let mouseDown = false;

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  const skipLength = this.dataset.skip;
  video.currentTime += Number(skipLength);
}

function handleRangeUpdate(e) {
  if (!mouseDown) return;
  video[this.name] = this.value;
}

function handleProgress() {
  const playPercentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${playPercentage}%`;
}

function scrub(e) {
  if (!mouseDown) return;
  const position = (e.offsetX / progress.offsetWidth);
  video.currentTime = video.duration * position;
}

function toggleFullScreen() {
  video.requestFullscreen();
}

// Hook everything up
toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("timeupdate", handleProgress);
video.addEventListener("pause", updateButton);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) => range.addEventListener("mousemove", handleRangeUpdate));
ranges.forEach((range) => range.addEventListener("mousedown", () => mouseDown = true));
ranges.forEach((range) => range.addEventListener("mouseup", () => mouseDown = false));
progress.addEventListener("click",scrub);
progress.addEventListener("mousemove",scrub);
progress.addEventListener("mousedown",() => mouseDown = true);
progress.addEventListener("mouseup",() => mouseDown = false);
fullScreenButton.addEventListener("click", toggleFullScreen);

