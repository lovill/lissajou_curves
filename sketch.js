let a_ampl = 80;
let b_ampl = 80;
let a_fr = 1;
let b_fr = 1;
let delta_phase_shift = 1;
let t_val = 0;  

let x_mm = 140;
let y_mm = 210;

let pts = [];

let isLooping = true;  // Variable to track whether draw() is looping

function setup() {
  createCanvas(600, 600);  
  background(0, 0, 95); // Off-white background

  let dpi = 96;  // Common DPI for screens
  let widthInMM = pixelsToMM(width, dpi);  // Convert width to mm
  let heightInMM = pixelsToMM(height, dpi);  // Convert height to mm
  let x_px = mmToPixels(x_mm, dpi);
  let y_px = mmToPixels(y_mm, dpi);
  
  console.log("Canvas size in mm:", widthInMM.toFixed(2), "x", heightInMM.toFixed(2));
  console.log(x_mm + " mm is approximately " + x_px.toFixed(2) + " pixels at " + dpi + " DPI.");
  console.log(y_mm + " mm is approximately " + y_px.toFixed(2) + " pixels at " + dpi + " DPI.");
}


function draw() {

  let coords = []
  coords = lissajou_curves(a_ampl, b_ampl, a_fr, b_fr, t_val, delta_phase_shift);
  pts.push(createVector(coords[0], coords[1]));
  t_val += 0.005;
  // a_ampl += 0.01;
  a_ampl = remap(mouseY, 0, width, 80, 180);
  // b_ampl += 0.05;
  b_ampl = remap(mouseY, 0, width, 80, 180);
  // a_fr += 0.02;
  b_fr += 0.01;
  let test_val = remap(mouseX, 0, width, 1.0, 2.0);
  // console.log("test_val", test_val);
  // console.log(mouseX);
  delta_phase_shift += 0.05
  // delta_phase_shift = remap(mouseX, 0, width, 1, 2);


  // // Translate the origin to the center.
  translate(width/2, height/2);
  ellipse(coords[0], coords[1], 1, 1);
  rect(coords[0], coords[1], 10, 10);
  fill(255, 255, 255, 100);
  stroke(255);
  strokeWeight(0.1);
  // noFill();

  // beginShape(["line"]);
  // for (let pt of pts) {
  //   vertex(pt.x, pt.y);  // Add each point to the shape
  // }
  // endShape();  // Finish the shape

  // console.log(coords);

  // let rw = 520;
  // let rh = 790;
  // rect(0 - rw/2, 0 - rh/2, rw, rh)
  // // fill(0,0,0,255);
  // noFill();
  // stroke('red');
  // strokeWeight(5);
}


function lissajou_curves(_a_ampl, _b_ampl, _a_fr, _b_fr, _t, _delta_phase_shift) {

  let x = _a_ampl * sin(_a_fr * _t + _delta_phase_shift);
  let y = _b_ampl * sin(_b_fr * _t);

  return [x, y];

}

function mousePressed() {
  if (isLooping) {
    noLoop();          // Stop the loop
  } else {
    loop();            // Resume the loop
  }
  isLooping = !isLooping;  // Toggle the loop state
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    save("myDrawing.svg");  // Save as SVG
  }
}

function pixelsToMM(pixels, dpi) {
  return (pixels * 25.4) / dpi;  // Conversion formula
}

function mmToPixels(mm, dpi = 96) {
  return (mm * dpi) / 25.4;  // Conversion formula
}


function remap(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}