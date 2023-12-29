// Start Menu

let startMenu = document.querySelector(".start");
let startButton = document.querySelector(".task__start");

startMenu.style.display = "none";

startButton.addEventListener("click", function (event) {
  event.stopPropagation();
  startMenu.style.display =
    startMenu.style.display === "none" ? "flex" : "none";
});

document.addEventListener("click", function (event) {
  if (!startMenu.contains(event.target)) {
    startMenu.style.display = "none";
  }
});

// Power Menu
let powerMenu = document.querySelector(".start__power-menu");
let powerButton = document.querySelector(".start__user__pow-wrap");

powerMenu.style.display = "none";

powerButton.addEventListener("click", function (event) {
  event.stopPropagation();
  powerMenu.style.display =
    powerMenu.style.display === "none" ? "flex" : "none";
});

document.addEventListener("click", function (event) {
  if (!powerMenu.contains(event.target)) {
    powerMenu.style.display = "none";
  }
});
