import {docArray} from "./defaultarrays.js";
let txtListeners = [];

export function attachTxtListeners() {
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
    let handler = () => {
      txtApp.style.display = "block";
      let docName = item.getAttribute("data-name");
      openDocument(docName);
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

  // save button
  let txtSave = document.querySelector(".text-app__options__save");

  function saveTxt() {
    let txtSaveName = txtMain.getAttribute("data-name");
    let txtSaveContent = txtMain.value;
    let txtSaveIndex = docArray.findIndex((item) => item.name === txtSaveName);

    if (txtSaveIndex !== -1) {
      docArray[txtSaveIndex].docContent = txtSaveContent;
      txtMain.innerHTML = txtSaveContent;
    } else {
      console.error(`Document with name ${txtSaveName} not found in docArray`);
    }
  }

  txtSave.addEventListener("click", saveTxt);
  txtListeners.push({
    element: txtSave,
    event: "click",
    handler: saveTxt,
  });

  // When a document is opened
  function openDocument(documentName) {
    let documentIndex = docArray.findIndex(
      (item) => item.name === documentName
    );

    if (documentIndex !== -1) {
      let docContent = docArray[documentIndex].docContent;
      txtMain.value = docContent;
      txtMain.innerHTML = docContent;
      txtMain.setAttribute("data-name", documentName);
    } else {
      console.error(`Document with name ${documentName} not found in docArray`);
    }
  }
}
