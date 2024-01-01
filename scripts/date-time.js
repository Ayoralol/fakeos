// Time and Date update per second

const updateTime = () => {
  let now = new Date();

  let date = now.toLocaleDateString();
  let time = now
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();

  document.querySelector(".task__icons__time--time").innerText = time;
  document.querySelector(".task__icons__time--date").innerText = date;
};

setInterval(updateTime, 1000);
