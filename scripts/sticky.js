// Get the sticky app and the sticky click items
let stickyApp = document.querySelector(".sticky-app");
let stickyClickItems = document.querySelectorAll(".sticky--click");
let stickyHeadWrap = document.querySelector(".sticky-app__head--wrap");

// Set the initial display style of the sticky app to "none"
stickyApp.style.display = "none";

// Add click event listeners to the sticky click items
stickyClickItems.forEach(function (item) {
  item.addEventListener("click", function () {
    stickyApp.style.display = "block";
  });
});

// Add a click event listener to the sticky head wrap
stickyHeadWrap.addEventListener("click", function () {
  stickyApp.style.display = "none";
});
