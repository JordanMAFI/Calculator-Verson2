// Selectors
let keys = document.querySelectorAll('.key');
let operators = document.querySelectorAll('.operator');
let display = document.querySelector('#display');

let buttons = [keys, operators]

// See if enter is pressed
let isEnterKeyPressed = function(e){
  if (e.keyCode ===13){
    if (display.value) {
      // calculate and show the answer to display
      display.value = eval(display.value);
    }
  }
}

let getPosition = function (string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

let calculate = function(e) {
  // current clicked buttons value
  const clicked = event.target.value;

if (clicked === "=") {

    // check if the display is not empty then only do the calculation
    if (display.value !=="") {

      // Check for minusing with negative numbers
      if (display.value.includes("--")) {
        let str = display.value.replace("--", "+");
        display.value = eval(str);
        return;
      }

      // calculate and show the answer to display
      display.value = eval(display.value);
    }
  } else if (clicked === "C") {

    // clear everything on display
    display.value = "";

    // Delete last char
  } else if (clicked === "D") {

    // clear everything on display
    display.value = display.value.slice(0, -1);

  } else {

    // otherwise concatenate it to the display
    display.value += clicked;
  }
  // resize text to fit on display
  if (display.value.length >= 9){
    display.style.fontSize="350%";
  }
  if (display.value.length >= 11){
    display.style.fontSize="200%";
  }
}

// assigning event handlers to all button classes
buttons.forEach((items) => {
  items.forEach((item) => {
    item.addEventListener('click', calculate)
  });
});

display.addEventListener("keyup", isEnterKeyPressed);
