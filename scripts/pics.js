let picListeners = [];

function attachPicListeners() {
  picListeners.forEach(function (listener) {
    listener.element.removeEventListener(listener.event, listener.handler);
  });
  picListeners = [];

  let picApp = document.querySelector(".pics-app");
  let picClickItems = document.querySelectorAll(".pic-app--click");
  let picClose = document.querySelector(".pics-app__top__exit");
  let picMain = document.querySelector(".pics-app__main");

  picApp.style.display = "none";

  picClickItems.forEach(function (item) {
    let handler = function () {
      picApp.style.display = "block";
      let docContent = item.getAttribute("data-value");
      picMain.innerHTML = `<img src="${docContent}" class="pics-app__main__img"/>`;
    };
    item.addEventListener("click", handler);
    picListeners.push({element: item, event: "click", handler: handler});
  });

  let handler = function () {
    picApp.style.display = "none";
  };
  picClose.addEventListener("click", handler);
  picListeners.push({
    element: picClose,
    event: "click",
    handler: handler,
  });
}
attachPicListeners();
let setBg = document.querySelector(".pics-app__options__bg");

setBg.addEventListener("click", function () {
  let main = document.querySelector(".main");
  let image = document.querySelector(".pics-app__main__img");
  main.style.backgroundImage = `url('${image.src}')`;
});
