let edgeListeners = [];

function attachEdgeListeners() {
  edgeListeners.forEach(function (listener) {
    listener.element.removeEventListener(listener.event, listener.handler);
  });
  edgeListeners = [];

  let edgeApp = document.querySelector(".edge");
  let edgeClickItems = document.querySelectorAll(".edge--click");
  let edgeClose = document.querySelector(".edge__top__exit");

  edgeApp.style.display = "none";

  edgeClickItems.forEach(function (item) {
    let handler = function () {
      edgeApp.style.display = "block";
    };
    item.addEventListener("click", handler);
    edgeListeners.push({element: item, event: "click", handler: handler});
  });

  let handler = function () {
    edgeApp.style.display = "none";
  };
  edgeClose.addEventListener("click", handler);
  edgeListeners.push({
    element: edgeClose,
    event: "click",
    handler: handler,
  });
}
attachEdgeListeners();
