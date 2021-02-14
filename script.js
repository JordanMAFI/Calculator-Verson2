// Selectors
let keys = document.querySelectorAll(".key");
let operators = document.querySelectorAll(".operator");
let display = document.querySelector("#display");
let info = document.querySelector("#notification");

let buttons = [keys, operators];

// See if enter is pressed
let isEnterKeyPressed = function (e) {
  if (e.keyCode === 13) {
    if (display.value) {
      showAnswer(display.value);
    }
  }
};

let calculate = (e) => {
  const clicked = event.target.value;

  if (clicked === "=") {
    // check if the display is not empty then only do the calculation
    if (display.value !== "") {
      // Check for subtracting with negative numbers
      if (display.value.includes("--")) {
        let str = display.value.replace("--", "+");
        showAnswer(str);
        return;
      }
      showAnswer(display.value);
    }
  } else if (clicked === "C") {
    // clear everything on display
    display.value = "";
    // Delete last char backspace
  } else if (clicked === "D") {
    // clear everything on display
    display.value = display.value.slice(0, -1);
  } else {
    // otherwise concatenate it to the display
    display.value += clicked;
  }

  // resize text to fit on display
  if (display.value.length >= 10) {
    display.style.fontSize = "200%";
    display.style.height = "140px";
  } else {
    display.style.fontSize = "350%";
  }
};

// assigning event handlers to all button classes
buttons.forEach((items) => {
  items.forEach((item) => {
    item.addEventListener("click", calculate);
  });
});

display.addEventListener("keyup", isEnterKeyPressed);

// Calculate answer routine
let showAnswer = (str) => {
  display.value = eval(str);
  copyToClipboard(display.value);
  showInfo();
};

// Show Notification
let showInfo = () => {
  info.classList.remove("hide");
  info.classList.add("show");
  setInterval(() => {
    info.classList.remove("show");
    info.classList.add("hide");
  }, 4000);
};

/* Copied from:
  - https://www.30secondsofcode.org/js/s/copy-to-clipboard/
  - Copies answer to the clipboard
*/
const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = display.value;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
  console.log(`Copied answer: ${display.value} to the clipboard 😀👍`);
};
