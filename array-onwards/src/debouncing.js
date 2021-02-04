let scheduled = null;
window.addEventListener("mousemove", (event) => {
  if (!scheduled) {
    setTimeout(() => {
      console.log(scheduled.pageX, scheduled.pageY);
      document.body.textContent = `Mouse at ${scheduled.pageX}, ${scheduled.pageY}`;
      scheduled = null;
    }, 2500);
  }
  scheduled = event;
});

const button1 = document.querySelector("#btn1");
const button2 = document.querySelector("#btn2");
let last = 0;
button1.addEventListener("click", (event) => {
  const now = new Date().getTime();
  if (now - last < 5000) {
    return;
  } else {
    last = now;
    console.log("clicked");
  }
});

let timeoutId;
button2.addEventListener("click", (event) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    console.log("clicked");
  }, 2000);
});
