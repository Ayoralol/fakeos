let powerButton = document.querySelector(".power--shutdown");

powerButton.addEventListener("click", function () {
  let body = document.getElementsByTagName("body")[0];
  let shutdown = confirm("Are you sure you want to shutdown?");
  if (shutdown) {
    body.style.backgroundColor = "black";
    body.innerHTML = "<p class='shutdown__screen'>(F5 is the power button)</p>";
  }
});
