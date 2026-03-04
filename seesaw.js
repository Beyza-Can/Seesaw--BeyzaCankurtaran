const plank = document.getElementById("plank");
const leftWeightText = document.getElementById("left-weight-value");
const rightWeightText = document.getElementById("right-weight-value");
const angleText = document.getElementById("tilt-angle-value");
const leftTorqueText = document.getElementById("left-tork-value");
const rightTorqueText = document.getElementById("right-tork-value");
const nextWeightText = document.getElementById("next-weight-value");
const resetBtn = document.getElementById("resetBtn");

const width = 400;
const center = width / 2;

let items = [];
let mousePos = null;
let nextValue = randomWeight();

load();
drawAll();
update();


// mouse pozisyonunu al
document.addEventListener("mousemove", function(e){

  const box = plank.getBoundingClientRect();

  if(
    e.clientX > box.left &&
    e.clientX < box.right &&
    e.clientY > box.top &&
    e.clientY < box.bottom
  ){
    mousePos = e.clientX - box.left;
  }else{
    mousePos = null;
  }

});


plank.addEventListener("click", function(){

  if(mousePos === null) return;

  items.push({
    weight: nextValue,
    pos: mousePos
  });

  addWeight(nextValue, mousePos);

  nextValue = randomWeight();
  update();
});


function addWeight(w, p){
  const div = document.createElement("div");
  div.className = "weight";
  div.innerText = w;
  div.style.left = (p - 12) + "px";
  plank.appendChild(div);
}


function update(){

  let leftT = 0;
  let rightT = 0;
  let leftW = 0;
  let rightW = 0;

  for(let i = 0; i < items.length; i++){

    const obj = items[i];
    const dist = Math.abs(obj.pos - center);

    if(obj.pos < center){
      leftT += obj.weight * dist;
      leftW += obj.weight;
    }else{
      rightT += obj.weight * dist;
      rightW += obj.weight;
    }
  }

  leftWeightText.innerText = leftW + " kg";
  rightWeightText.innerText = rightW + " kg";

  leftTorqueText.innerText = Math.floor(leftT);
  rightTorqueText.innerText = Math.floor(rightT);

  let angle = (rightT - leftT) / 360;

  if(angle > 30) angle = 30;
  if(angle < -30) angle = -30;

  plank.style.transform = "rotate(" + angle + "deg)";
  angleText.innerText = angle.toFixed(2);

  save();
}


function randomWeight(){
  const n = Math.floor(Math.random() * 10) + 1;
  nextWeightText.innerText = n + " kg";
  return n;
}


resetBtn.addEventListener("click", function(){
  items = [];
  save();
  drawAll();
  nextValue = randomWeight();
  update();
});


function drawAll(){
  const old = plank.querySelectorAll(".weight");
  old.forEach(w => w.remove());

  for(let i = 0; i < items.length; i++){
    addWeight(items[i].weight, items[i].pos);
  }
}


function save(){
  localStorage.setItem("seesawState", JSON.stringify(items));
}


function load(){
  const data = localStorage.getItem("seesawState");
  if(data){
    items = JSON.parse(data);
  }
}
