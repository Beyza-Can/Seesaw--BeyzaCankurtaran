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
let mouseX = null;       
let nextWeight = generateNextWeight();

loadState();
renderAll();
updateSeesaw();

//check if mouse is over plank and update mouseX accordingly =>chatgpt
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

//handle mouse move on plank to add weight at mouseX position
document.addEventListener("mousemove", (e) => {

});

//handle click on plank to add weight at mouseX position
plank.addEventListener("click", () => {
});
//handle reset button click to clear all weights and reset state
function createWeightElement(weight, position){
}
//calculate total weights, torques and tilt angle, then update the display
function updateSeesaw(){}


function renderAll(){
  plank.querySelectorAll(".weight").forEach(w => w.remove());
  objects.forEach(obj => createWeightElement(obj.weight, obj.position));
}
function saveState(){
  localStorage.setItem("seesawState", JSON.stringify(objects));
}

function loadState(){
  const saved = localStorage.getItem("seesawState");
  if(saved){
    objects = JSON.parse(saved);
  }
}
