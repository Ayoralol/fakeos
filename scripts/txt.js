let txtListeners = [];

function attachTxtListeners() {
  txtListeners.forEach(function (listener) {
    listener.element.removeEventListener(listener.event, listener.handler);
  });
  txtListeners = [];

  let txtApp = document.querySelector(".text-app");
  let txtClickItems = document.querySelectorAll(".txt--click");
  let txtClose = document.querySelector(".text-app__top__exit");
  let txtMain = document.querySelector(".text-app__main__text");

  txtApp.style.display = "none";

  txtClickItems.forEach(function (item) {
    let handler = function () {
      txtApp.style.display = "block";
      let docContent = item.getAttribute("data-value");
      txtMain.innerHTML = docContent;
    };
    item.addEventListener("click", handler);
    txtListeners.push({element: item, event: "click", handler: handler});
  });

  let handler = function () {
    txtApp.style.display = "none";
  };
  txtClose.addEventListener("click", handler);
  txtListeners.push({
    element: txtClose,
    event: "click",
    handler: handler,
  });
}
attachTxtListeners();
