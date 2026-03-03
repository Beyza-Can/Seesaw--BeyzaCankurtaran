const plank = document.getElementById("plank");
const leftWeightEl = document.getElementById("left-weight-value");
const rightWeightEl = document.getElementById("right-weight-value");
const angleValueEl = document.getElementById("tilt-angle-value");
const leftTorqueEl = document.getElementById("left-tork-value");
const rightTorqueEl = document.getElementById("right-tork-value");
const nextWeightEl = document.getElementById("next-weight-value");
const resetBtn = document.getElementById("resetBtn");

const PLANK_WIDTH = 400;
const PIVOT = PLANK_WIDTH / 2;

let objects = [];
let mouseX = null;       // Mouse’un plank içindeki konumu
let nextWeight = generateNextWeight();

loadState();
renderAll();
updateSeesaw();
document.addEventListener("mousemove", (e) => {

  const rect = plank.getBoundingClientRect();

  if (
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom
  ) {
    mouseX = e.clientX - rect.left;
  } else {
    mouseX = null;
  }

});
