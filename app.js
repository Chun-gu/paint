const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls__color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const DEFAULT_COLOR = "#2c2c2c";

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeStyle = DEFAULT_COLOR;
context.fillStyle = DEFAULT_COLOR;

context.lineWidth = 2.5;

let paint = false;
let enter = false;
let filling = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (paint === false) {
    context.beginPath();
    context.moveTo(x, y);
  } else if (paint && enter) {
    context.lineTo(x, y);
    context.stroke();
  }
}

function onMouseDown(event) {
  paint = true;
}

function startPaint() {
  paint = true;
}

function stopPaint() {
  paint = false;
}

function enterCanvas() {
  enter = true;
  context.beginPath();
}

function leaveCanvas() {
  enter = false;
  context.closePath();
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  context.strokeStyle = color;
  context.fillStyle = color;
}

function changeThickness(event) {
  context.lineWidth = event.target.value;
}

function changeMode(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

function fill() {
  if (filling) {
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function preventRClick(event) {
  event.preventDefault();
}

function saveImage(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPaint);
  canvas.addEventListener("mouseup", stopPaint);
  window.addEventListener("mouseup", stopPaint);
  canvas.addEventListener("mouseleave", leaveCanvas);
  canvas.addEventListener("mouseenter", enterCanvas);
  canvas.addEventListener("mousedown", fill);
  canvas.addEventListener("contextmenu", preventRClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", changeThickness);
}

if (mode) {
  mode.addEventListener("click", changeMode);
}

if (save) {
  save.addEventListener("click", saveImage);
}
