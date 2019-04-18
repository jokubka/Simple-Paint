// ------------------------------------------
// Making Canvas responsive to window size
// ---------------------------------------------

var canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.78;

function resizeCanvas() {
  if(window.innerWidth > 1067){
  canvas.width = window.innerWidth * 0.7;
  canvas.height = window.innerHeight * 0.78;
  }
}

window.addEventListener("resize",resizeCanvas,false);

// ---------------------------------------------
// ---------CHOOSING COLORS AND LAYERS----------
// ---------------------------------------------

// Colors for Drawing function
var colorBackground;
var colorShadow;
var colorBrush = "black"




// Setting active layer

var layerBrush = true;
var layerShadow;
var layerBackground;

function layerSet(e) {
  var layerList = ["background", "shadow_color", "current_color"];
  var current = e.target;
  var layerLoop;

  // Checks which layer has class active_box and removes it
  for(var i = 0; i < layerList.length; i++){
    layerLoop = document.querySelector("."+layerList[i]);
    if(layerLoop.classList.contains("active_box")) {
      layerLoop.classList.remove("active_box");
    }
  }
  // Adding active_box class to selected layer
  current.classList.add("active_box");
  // Setting boolean values to layers
  if(current.classList.contains("background")) {
    layerBackground = true;
    layerShadow = false;
    layerBrush = false;
  }

  if(current.classList.contains("shadow_color")) {
    layerBackground = false;
    layerShadow = true;
    layerBrush = false;
  }

  if(current.classList.contains("current_color")){
    layerBackground = false;
    layerShadow = false;
    layerBrush = true;
  }

}

 var layerAll = document.querySelector(".layer_wrap");
 layerAll.addEventListener("click",function(e){layerSet(e)},false);

// Setting color
// --------------------------------
function setColor (e){

  var current = e.target;


  // Assigning color values to layers
  var activeColor;
  var layer;

  // Hex input color
  var hexInput = document.querySelector("#hex_input");
  var hexColor = "#" + hexInput.value;
  if(current.id == "hex") {
     activeColor = hexColor;
     current.style.color = hexColor;
   }
   else { activeColor = current.id;}

  //Layer color
  if(layerBrush){
    layer = document.querySelector(".current_color");
    colorBrush = activeColor;
    layer.style.backgroundColor = activeColor;
  }

  if(layerShadow){
    layer = document.querySelector(".shadow_color");
    colorShadow = activeColor;
    layer.style.backgroundColor = activeColor;
  }

  if(layerBackground){
    var canvas = document.querySelector("#canvas")
    layer = document.querySelector(".background");
    colorBackground = activeColor;
    layer.style.backgroundColor = activeColor;
    canvas.style.backgroundColor = activeColor;
  }

}

var colorPalet = document.querySelector(".color_palet_wrap");

colorPalet.addEventListener("click", function(e){setColor(e)}, false);

// -------------------------------------------
// --------BEGINING OF DRAWING----------------
// -------------------------------------------

var canvas = document.querySelector("#canvas");
var first;
var mouseButton = true;


function buttonDown(){
  mouseButton = true;
  first = true;
  canvas.addEventListener("mousemove",drawing,false);

}

function buttonUp(){
  mouseButton = false;
}


function drawing(pos){
  //Geting coordinates of mouse
  var hPosition = pos.clientX - 4;
  var vPosition = pos.clientY - 4;

  //Rendering context
  var ctx = canvas.getContext("2d");

  if(mouseButton == true){
    //Setting first point
    if (first == true) {
      ctx.beginPath();
      ctx.moveTo(hPosition, vPosition);
      }

    //Drawing
    ctx.lineTo(hPosition,vPosition);
    ctx.stroke();
    ctx.strokeStyle = colorBrush;
    ctx.lineWidth = "8";
    ctx.lineCap = "round";

    // Shadow
    if(layerShadow == true && colorShadow !== "white"){
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = colorShadow;
    }
    else {
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
    }

    first = false;
  }
}


canvas.addEventListener('mousedown', buttonDown, false);
canvas.addEventListener('mouseup', buttonUp, false);
