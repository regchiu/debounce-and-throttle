const mouseArea = document.querySelector(".mouse-area");
const clearBtn = document.querySelector(".clear-btn");
const canvas = document.getElementById("canvas");
let count;
let ctx;

function init() {
  count = makeCounter();
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    ctx.font = "24px serif";
    ctx.fillStyle = "#fb5607";
    ctx.fillText("Debounce", 0, 45);
    ctx.fillStyle = "#8338ec";
    ctx.fillText("Throttle", 0, 145);
    ctx.fillStyle = "#3a86ff";
    ctx.fillText("None", 0, 245);
  } else {
    alert("canvas unsupported");
  }
}

function mouseMove1(e) {
  lineDrawing1(count());
}
function mouseMove2(e) {
  lineDrawing2(count());
}
function mouseMove3(e) {
  lineDrawing3(count());
}

function makeCounter() {
  let moveCount = 0;
  return function () {
    return moveCount++;
  };
}

function lineDrawing1(moveCount) {
  ctx.beginPath();
  ctx.strokeStyle = "#fb5607";
  ctx.moveTo(moveCount * 1, 50);
  ctx.lineTo(moveCount * 1, 100);
  ctx.stroke();
  ctx.closePath();
}

function lineDrawing2(moveCount) {
  ctx.beginPath();
  ctx.strokeStyle = "#8338ec";
  ctx.moveTo(moveCount * 1, 150);
  ctx.lineTo(moveCount * 1, 200);
  ctx.stroke();
  ctx.closePath();
}

function lineDrawing3(moveCount) {
  ctx.beginPath();
  ctx.strokeStyle = "#3a86ff";
  ctx.moveTo(moveCount * 1, 250);
  ctx.lineTo(moveCount * 1, 300);
  ctx.stroke();
  ctx.closePath();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  init();
}

function debounce(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;
  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

mouseArea.addEventListener("mousemove", debounce(mouseMove1, 300));

mouseArea.addEventListener("mousemove", throttle(mouseMove2, 300));

mouseArea.addEventListener("mousemove", mouseMove3);

clearBtn.addEventListener("click", clearCanvas);

init();
