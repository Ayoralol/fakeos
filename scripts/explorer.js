// module imports
import {attachStickyListeners} from "./sticky.js";
import {attachEdgeListeners} from "./edge.js";
import {attachPicListeners} from "./pics.js";
import {attachTxtListeners} from "./txt.js";
import {docArray} from "./defaultarrays.js";
import {binArray} from "./defaultarrays.js";
import {deskArray} from "./defaultarrays.js";
import {picArray} from "./defaultarrays.js";
// open/close explorer window

let explorer = document.querySelector(".explorer");
let openDoc = document.querySelectorAll(".doc--click");
let openBin = document.querySelectorAll(".bin--click");
let openDesk = document.querySelectorAll(".desk--click");
let openPic = document.querySelectorAll(".pic--click");
let closeButton = document.querySelector(".ex--close");
let deleteBtn = document.querySelectorAll(".explorer__options__del-list__item");
let eventListeners = [];

// update queries due to changing queries not being updated
function updateQueries() {
  openDoc = document.querySelectorAll(".doc--click");
  openBin = document.querySelectorAll(".bin--click");
  deleteBtn = document.querySelectorAll(".explorer__options__del-list__item");
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

  let newDocButton = document.querySelector(".explorer__options__new");
  if (newDocButton) {
    let handler = createNewDocument;
    newDocButton.addEventListener("click", handler);
    eventListeners.push({
      element: newDocButton,
      event: "click",
      handler: handler,
    });
  }

  let deleteMainButton = document.querySelector(".explorer__options__delete");
  if (deleteMainButton) {
    let handler = function (event) {
      event.stopPropagation();
      deleteDisplay();
    };
    deleteMainButton.addEventListener("click", handler);
    eventListeners.push({
      element: deleteMainButton,
      event: "click",
      handler: handler,
    });
  }

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

// Creating a new document

class Document {
  constructor(name) {
    this.name = name;
    this.icon = "./images+icons/txticon.png";
    this.appClass = "txt--click";
    this.docContent = "";
  }
}

function addDocument(name) {
  let newDocument = new Document(name);
  docArray.push(newDocument);
  renderDoc();
}

function createNewDocument() {
  let docName = prompt("Enter the name of the document");
  if (docName !== null && docName !== "") {
    addDocument(docName);
  }
}

// Delete document
// delete display
function toggleDeleteListener(event) {
  let render = document.querySelector(".explorer__options__del-list");
  if (render.style.display === "flex" && !render.contains(event.target)) {
    render.style.display = "none";
  }
}

function deleteDisplay() {
  updateDOM();
  let render = document.querySelector(".explorer__options__del-list");
  let array = docArray;
  render.style.display = "flex";

  render.innerHTML = "";
  let html = `<p class="explorer__options__del-list--head">Select file to delete</p>`;
  array.forEach(function (item) {
    let docName = item.name;
    html += `
    <div class="explorer__options__del-list__item">
        <p class="explorer__options__del-list__item--text" data-name="${docName}">${docName}</p>
    </div>`;
  });
  render.innerHTML = html;

  deleteBtn = document.querySelectorAll(
    ".explorer__options__del-list__item--text"
  );
  deleteBtn.forEach(function (button) {
    let handler = function () {
      let docName = button.dataset.name;
      deleteDocument(docName);
    };
    button.addEventListener("click", handler);
    eventListeners.push({element: button, event: "click", handler: handler});
  });

  document.removeEventListener("click", toggleDeleteListener);
  document.addEventListener("click", toggleDeleteListener);
}

// delete actual item
function deleteDocument(docName) {
  let index = docArray.findIndex((item) => item.name === docName);
  if (index !== -1) {
    let deletedDoc = docArray.splice(index, 1)[0];
    binArray.push(deletedDoc);
    deleteDisplay();
    renderDoc();
    updateBin();
  }
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
    "<div class='explorer__options__clear'><p class='explorer__options__delete--text'>Empty Bin</p></div>";
  let restoreBtnHTML =
    "<div class='explorer__options__restore'><p class='explorer__options__delete--text'>Restore Bin</p></div>";
  let deleteBtnHTML = `<div class='explorer__options__delete'><p class='explorer__options__delete--text delete--item'>Delete -</p></div>`;
  //title update
  title.innerHTML = topText;
  // options update
  options.innerHTML = `
  ${newBtn ? newBtnHTML : ""}
  ${deleteBtn ? deleteBtnHTML : ""}
  ${bin ? restoreBtnHTML : ""}
  ${bin ? clearBtnHTML : ""}`;

  // main update
  render.innerHTML = "";
  let html = "";
  array.forEach(function (item) {
    let docContent = item.docContent !== undefined ? item.docContent : "";
    let docName = item.name;
    html += `
    <div class="explorer__main__render__item ${item.appClass}" data-name="${docName}" data-value="${docContent}">
      <img src=${item.icon} class="explorer__main__render__item--img">
      <p class="explorer__main__render__item--text">${item.name}</p>
    </div>`;
    render.innerHTML = html;
  });
  updateDOM();
}
