var colors = generateRandomColors(6);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
let easyMode = false;
function setEasy(isNewColor) {
  if (!easyMode || isNewColor === 1) {
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
    //hide the squares
    for (var a = 3; a < squares.length; a++) {
      squares[a].classList.add("d-none");
    }
    colors = generateRandomColors(3);
    pickedColor = pickColor();
    colorizeSquares();
    colorDisplay.textContent = pickedColor;
    easyMode = true;
    reset();
  }
}
function setHard(isNewColor) {
  if (easyMode || isNewColor === 1) {
    easyButton.classList.remove("selected");
    hardButton.classList.add("selected");
    //hide the squares
    for (var a = 3; a < squares.length; a++) {
      squares[a].classList.remove("d-none");
    }
    colors = generateRandomColors(6);
    pickedColor = pickColor();
    colorizeSquares();
    colorDisplay.textContent = pickedColor;
    easyMode = false;
    reset();
  }
}
easyButton.addEventListener("click", function() {
  setEasy(0);
});

hardButton.addEventListener("click", function() {
  setHard(0);
});
function reset() {
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  h1.style.backgroundColor = "steelblue";
}
resetButton.addEventListener("click", function() {
  if (easyMode) {
    setEasy(1);
  } else {
    setHard(1);
  }
  reset();
});
colorDisplay.textContent = pickedColor;
function colorizeSquares() {
  for (var i = 0; i < squares.length; i++) {
    // Adds Initial Colors to Squares
    squares[i].style.backgroundColor = colors[i];
    // add click listeners to squares
    squares[i].addEventListener("click", function() {
      //Grab color of clicked square;
      var clickedColor = this.style.backgroundColor;
      //Compare color to picked Color
      console.log(clickedColor, pickedColor);
      if (clickedColor === pickedColor) {
        changeColors(pickedColor);
        messageDisplay.textContent = "Correct!";
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}
function changeColors(color) {
  //Loop through all squares
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor(min, max) {
  var randomColor = random(0, colors.length);
  return colors[randomColor];
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomColors(num) {
  //make an array
  var arr = [];
  // Repeat num times
  for (var i = 0; i < num; i++) {
    // Get random Color, push into array
    arr.push(randomColor());
  }
  //return array
  return arr;
}
//Returns a random Color
function randomColor() {
  //pick a red from 0 - 255
  var R = random(0, 255);
  //pick a green from 0 - 255
  var G = random(0, 255);
  //pick a blue from 0 - 255
  var B = random(0, 255);
  return `rgb(${R}, ${G}, ${B})`;
}

colorizeSquares();
