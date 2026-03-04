const plank = document.getElementById("plank");
const leftWeightText = document.getElementById("left-weight-value");
const rightWeightText = document.getElementById("right-weight-value");
const angleText = document.getElementById("tilt-angle-value");
const leftTorqueText = document.getElementById("left-tork-value");
const rightTorqueText = document.getElementById("right-tork-value");
const nextWeightText = document.getElementById("next-weight-value");
const resetBtn = document.getElementById("resetBtn");
const logPanel = document.getElementById("logPanel");
const width = 400;
const center = width / 2;

let items = [];
let mousePos = null;
let nextValue = randomWeight();

const weightColors = {
  1: "#FF6B6B",
  2: "#FF9F43",
  3: "#FFD93D",
  4: "#6BCB77",
  5: "#4D96FF",
  6: "#9D4EDD",
  7: "#F72585",
  8: "#00C2A8",
  9: "#FF595E"
};


load();
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

  if (mousePos === null) return;

  const dist = Math.abs(mousePos - center);
  const torque= nextValue * dist;
  const side = mousePos < center ? "Left" : "Right";
  items.push({
    weight: nextValue,
    pos: mousePos
  });

  addWeight(nextValue, mousePos, side, torque);

  nextValue = randomWeight();
  update();
});


function addWeight(w, p,side,t,dist) {
  const baseSize = 30;
  const sizeMultiply = 5;
  const size = baseSize + (w * sizeMultiply);
  const div = document.createElement("div");
  div.className = "weight";
  div.innerText = w;
  div.style.backgroundColor = weightColors[w];
  div.style.width = size + "px";
  div.style.height = size + "px";
  div.style.lineHeight = size + "px";

  div.style.left = (p - size / 2) + "px";

  plank.appendChild(div);
  addLog(side,dist,w,t);
}
function addLog(side,pos,weight,torque) {
  const logItem = document.createElement("div");
  logItem.className = "log-item";
  logItem.innerText = `${side} - Position: ${pos} px, Weight: ${weight} kg, Torque: ${torque} Nm`;
  if (side === "Left") {
    logItem.style.color = "#FF6B6B";
  } else {
    logItem.style.color = "#4D96FF";
  }
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
}


function randomWeight() {
  const n = Math.floor(Math.random() * 10) + 1;
  nextWeightText.innerText = n + " kg";
  return n;
}


resetBtn.addEventListener("click", function () {
  items = [];
  save();
  drawAll();
   logPanel.innerHTML = "";
  nextValue = randomWeight();
  update();
});


function drawAll() {
  const old = plank.querySelectorAll(".weight");
  old.forEach(w => w.remove());

  for (let i = 0; i < items.length; i++) {
    addWeight(items[i].weight, items[i].pos);
  }
}


function save() {
  localStorage.setItem("seesawState", JSON.stringify(items));
}


function load() {
  const data = localStorage.getItem("seesawState");
  if (data) {
    items = JSON.parse(data);
  }
}
