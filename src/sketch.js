let values = [];
const totalBars = 50;

function setup() {
  const canvas = createCanvas(900, 400);
  canvas.parent("canvas-wrapper");

  generateArray();

  const generateBtn = document.getElementById("generate-btn");
  generateBtn.addEventListener("click", generateArray);
}

function draw() {
  background(245);
  drawBars();
}

function generateArray() {
  values = [];
  for (let i = 0; i < totalBars; i++) {
    values.push(floor(random(20, height - 20)));
  }
}

function drawBars() {
  const barWidth = width / values.length;

  for (let i = 0; i < values.length; i++) {
    const x = i * barWidth;
    const y = height - values[i];

    stroke(255);
    fill(100, 150, 255);
    rect(x, y, barWidth, values[i]);
  }
}