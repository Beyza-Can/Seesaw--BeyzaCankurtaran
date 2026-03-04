const plank = document.getElementById("plank");
const leftWeightText = document.getElementById("left-weight-value");
const rightWeightText = document.getElementById("right-weight-value");
const angleText = document.getElementById("tilt-angle-value");
const leftTorqueText = document.getElementById("left-tork-value");
const rightTorqueText = document.getElementById("right-tork-value");
const nextWeightText = document.getElementById("next-weight-value");
const resetBtn = document.getElementById("resetBtn");
const pauseBtn = document.getElementById("PauseBtn");
const logPanel = document.getElementById("logPanel");
const width = 400;
const center = width / 2;
const weightColors = {
  1: "yellow", 2: "orange", 3: "red", 4: "blue", 5: "green", 6: "purple", 7: "pink", 8: "gray", 9: "brown",
};

let items = [];
let paused = false;
let mousePos = null;
let nextValue = randomWeight();

load();
loadLog();
drawAll();
update();

// mouse pozisyonunu al
document.addEventListener("mousemove", function (e) {

  const box = plank.getBoundingClientRect();

  if (
    e.clientX > box.left &&
    e.clientX < box.right &&
    e.clientY > box.top &&
    e.clientY < box.bottom
  ) {
    mousePos = e.clientX - box.left;
  } else {
    mousePos = null;
  }

});
plank.addEventListener("click", function () {
  if (mousePos === null || paused) return;

  const newItem = {
    weight: nextValue,
    pos: mousePos
  };

  items.push(newItem);
  addWeight(newItem);
  addLog(newItem);
  update();
  nextValue = randomWeight();

});
resetBtn.addEventListener("click", function () {
  items = [];
  save();
  saveLog();
  drawAll();
  logPanel.innerHTML = "";
  nextValue = randomWeight();
  update();
});
pauseBtn.addEventListener("click", function () {
  togglePause();
});
function togglePause() {
  paused = !paused;
  if (paused) {
    pauseBtn.classList.add("paused");
    pauseBtn.innerText = "Resume";
  } else {
    pauseBtn.classList.remove("paused");
    pauseBtn.innerText = "Pause";
  } 

}
function addWeight(item) {
  const baseSize = 30;
  const sizeMultiply = 2;
  const size = baseSize + (item.weight * sizeMultiply);
  const div = document.createElement("div");
  div.className = "weight";
  div.innerText = item.weight;
  div.style.backgroundColor = weightColors[item.weight];
  div.style.width = size + "px";
  div.style.height = size + "px";
  div.style.lineHeight = size + "px";

  div.style.left = (item.pos - size / 2) + "px";

  plank.appendChild(div);
}
function addLog(item) {
  const dist = Math.abs(item.pos - center);
  const side = item.pos < center ? "Left" : "Right";
  const torque = item.weight * dist;
  const logItem = document.createElement("div");
  logItem.className = "log-item";
  logItem.innerText = `${side} - Position: ${dist.toFixed(0)} px, Weight: ${item.weight} kg, Torque: ${torque.toFixed(0)} Nm`;
  logItem.style.color =
    side === "Left" ? "red" : "blue";
  logPanel.appendChild(logItem);
  logPanel.scrollTop = logPanel.scrollHeight;
}
function update() {

  let leftT = 0;
  let rightT = 0;
  let leftW = 0;
  let rightW = 0;

  for (let i = 0; i < items.length; i++) {

    const obj = items[i];
    const dist = Math.abs(obj.pos - center);

    if (obj.pos < center) {
      leftT += obj.weight * dist;
      leftW += obj.weight;
    } else {
      rightT += obj.weight * dist;
      rightW += obj.weight;
    }
  }

  leftWeightText.innerText = leftW + " kg";
  rightWeightText.innerText = rightW + " kg";

  leftTorqueText.innerText = Math.floor(leftT);
  rightTorqueText.innerText = Math.floor(rightT);

  const angle = Math.max(-30, Math.min(30, (rightT - leftT) / 10));

  plank.style.transform = "rotate(" + angle + "deg)";
  angleText.innerText = angle.toFixed(2);

  save();
  saveLog();
}
function randomWeight() {
  const n = Math.floor(Math.random() * 10) + 1;
  nextWeightText.innerText = n;
  return n;
}
function drawAll() {

  plank.innerHTML = "";

  items.forEach(item => {
    addWeight(item);
  });

}
function save() {
  localStorage.setItem("seesawState", JSON.stringify(items));
}
function saveLog() {
  localStorage.setItem("seesawLog", logPanel.innerHTML);
}
function loadLog() {
  const logData = localStorage.getItem("seesawLog");
  if (logData) {
    logPanel.innerHTML = logData;
  }
}
function load() {
  const data = localStorage.getItem("seesawState");
  if (data) {
    items = JSON.parse(data);
  }
}
