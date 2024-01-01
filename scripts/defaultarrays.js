let docArray = [
  {
    name: "README",
    icon: "./images+icons/txticon.png",
    appClass: "txt--click",
    docContent:
      "This project was to re-create an OS of our choosing. I based this off of Windows 11 darkmode style that I displayed on my laptop and tried to match. The goal of this was to better implement our understanding of html, scss, and js, including using more arrow functions, modals and other js implementations. Created by Reece Smith.",
  },
];

let picArray = [
  {
    name: "Default Blue",
    icon: "./images+icons/backgrounds/previews/backgroundprev.jpg",
    appClass: "pic-app--click",
    docContent: "./images+icons/backgrounds/defaultBlue.jpg",
  },
  {
    name: "Default Dark Mode",
    icon: "./images+icons/backgrounds/previews/darkmodeprev.jpg",
    appClass: "pic-app--click",
    docContent: "./images+icons/backgrounds/darkmode.jpg",
  },
  {
    name: "Custom Pink",
    icon: "./images+icons/backgrounds/previews/pinkbackgroundprev.jpg",
    appClass: "pic-app--click",
    docContent: "./images+icons/backgrounds/pinkbackground.jpg",
  },
  {
    name: "Windows Purple",
    icon: "./images+icons/backgrounds/previews/windowsprettyprev.jpg",
    appClass: "pic-app--click",
    docContent: "./images+icons/backgrounds/windowspretty.jpg",
  },
];

let binArray = [];

const deskArray = [
  {
    name: "Bin",
    icon: "./images+icons/binfull.png",
    appClass: "bin--click",
  },
  {
    name: "Edge",
    icon: "./images+icons/edgeex.svg",
    appClass: "edge--click",
  },
  {
    name: "Sticky Notes",
    icon: "./images+icons/stickynotes.png",
    appClass: "sticky--click",
  },
  {
    name: "Documents",
    icon: "./images+icons/folderdesktop.png",
    appClass: "doc--click",
  },
];

export default {
  docArray,
  picArray,
  binArray,
  deskArray,
};
