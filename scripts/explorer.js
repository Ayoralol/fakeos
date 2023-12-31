// open/close explorer window

let explorer = document.querySelector(".explorer");
let openDoc = document.querySelectorAll(".doc--click");
let openBin = document.querySelectorAll(".bin--click");
let openDesk = document.querySelectorAll(".desk--click");
let openPic = document.querySelectorAll(".pic--click");
let closeButton = document.querySelector(".ex--close");
let eventListeners = [];

// update queries due to changing queries not being updated
function updateQueries() {
  openDoc = document.querySelectorAll(".doc--click");
  openBin = document.querySelectorAll(".bin--click");
}
// Initial display of explorer (per a bug)
explorer.style.display = "none";

// Opening and rendering eventlisteners
// using this attach function as the listeners were stacking on each other
// causing listeners to be added for every click so removing and re-adding fixes that
function attachEventListeners() {
  // Removing old listeners
  eventListeners.forEach(function (listener) {
    listener.element.removeEventListener(listener.event, listener.handler);
  });
  eventListeners = [];
  // Adding new listeners
  let eventHandler = (func) => {
    return function () {
      explorer.style.display = "block";
      func();
    };
  };

  openDoc.forEach(function (button) {
    let handler = eventHandler(renderDoc);
    button.addEventListener("click", handler);
    eventListeners.push({element: button, event: "click", handler: handler});
  });

  openBin.forEach(function (button) {
    let handler = eventHandler(renderBin);
    button.addEventListener("click", handler);
    eventListeners.push({element: button, event: "click", handler: handler});
  });

  openDesk.forEach(function (button) {
    let handler = eventHandler(renderDesk);
    button.addEventListener("click", handler);
    eventListeners.push({element: button, event: "click", handler: handler});
  });

  openPic.forEach(function (button) {
    let handler = eventHandler(renderPic);
    button.addEventListener("click", handler);
    eventListeners.push({element: button, event: "click", handler: handler});
  });

  attachStickyListeners();
  attachEdgeListeners();
  attachPicListeners();
  attachTxtListeners();
}

// Close explorer
closeButton.addEventListener("click", function () {
  explorer.style.display = "none";
});

attachEventListeners();

// DOM update for queries and listeners
function updateDOM() {
  updateQueries();
  attachEventListeners();
}

// default arrays for the explorer

// docArray class

class Document {
  constructor(name) {
    this.name = name;
    this.icon = "./images+icons/txt.png";
    this.appClass = "txt--click";
    this.docContent = "";
  }
}

// creating new document

function addDocument(name) {
  let newDocument = new Document(name);
  docArray.push(newDocument);
}

// render each file

function renderDoc() {
  let topText = "Documents";
  let array = docArray;
  let bin = false;
  let newBtn = true;
  let deleteBtn = true;
  renderMain(topText, array, bin, newBtn, deleteBtn);
}
function renderBin() {
  let topText = "Recycle Bin";
  let array = binArray;
  let bin = true;
  renderMain(topText, array, bin);
}
function renderDesk() {
  let topText = "Desktop";
  let array = deskArray;
  renderMain(topText, array);
}
function renderPic() {
  let topText = "Pictures";
  let array = picArray;
  renderMain(topText, array);
}

// full render

function renderMain(
  topText,
  array,
  bin = false,
  newBtn = false,
  deleteBtn = false
) {
  let render = document.querySelector(".explorer__main__render");
  let title = document.querySelector(".explorer__top__text");
  let options = document.querySelector(".explorer__options");
  let newBtnHTML =
    "<div class='explorer__options__new'><p class='explorer__options__new--text'>New +</p></div>";
  let clearBtnHTML =
    "<p class='explorer__options__delete--text clear--bin'>Clear Bin</p>";
  let deleteBtnHTML = `<div class='explorer__options__delete'>${
    bin
      ? clearBtnHTML
      : "<p class='explorer__options__delete--text delete--item'>Delete -</p>"
  }</div>`;
  //title update
  title.innerHTML = topText;
  // options update
  options.innerHTML = `
  ${newBtn ? newBtnHTML : ""}
  <div class="explorer__options__sort">
    <p class="explorer__options__sort--text">Sort &#8645;</p>
  </div>
  ${deleteBtn ? deleteBtnHTML : ""}`;
  // main update
  render.innerHTML = "";
  let html = "";
  array.forEach(function (item) {
    let docContent = item.docContent !== undefined ? item.docContent : "";
    html += `
    <div class="explorer__main__render__item ${item.appClass}" data-value="${docContent}">
      <img src=${item.icon} class="explorer__main__render__item--img">
      <p class="explorer__main__render__item--text">${item.name}</p>
    </div>`;
    render.innerHTML = html;
  });
  updateDOM();
}

// sort the arrays

function sortObjects(array, reverse = false) {
  array.sort(function (a, b) {
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  if (reverse == true) {
    array.reverse();
  }
}
