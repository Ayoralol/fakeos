let stickyListeners = [];

let stickyLoad = document.querySelector(".sticky-app");
stickyLoad.style.display = "none";

export const attachStickyListeners = () => {
  stickyListeners.forEach(function (listener) {
    listener.element.removeEventListener(listener.event, listener.handler);
  });
  stickyListeners = [];

  let stickyApp = document.querySelector(".sticky-app");
  let stickyClickItems = document.querySelectorAll(".sticky--click");
  let stickyHeadWrap = document.querySelector(".sticky-app__head--wrap");

  stickyClickItems.forEach(function (item) {
    let handler = function () {
      stickyApp.style.display = "block";
    };
    item.addEventListener("click", handler);
    stickyListeners.push({element: item, event: "click", handler: handler});
  });

  let handler = function () {
    stickyApp.style.display = "none";
  };
  stickyHeadWrap.addEventListener("click", handler);
  stickyListeners.push({
    element: stickyHeadWrap,
    event: "click",
    handler: handler,
  });
};
