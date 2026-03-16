let values = [];
let originalValues = [];
let steps = [];
let stepIndex = 0;
let isPlaying = false;

const totalBars = 50;

function setup() {
  const canvas = createCanvas(900, 400);
  canvas.parent("canvas-wrapper");

  generateArray();

  document.getElementById("generate-btn").addEventListener("click", generateArray);
  document.getElementById("start-btn").addEventListener("click", startBubbleSort);
}

function draw() {
  background(245);

  if (isPlaying && stepIndex < steps.length && frameCount % 8 === 0) {
    applyStep(steps[stepIndex]);
    stepIndex++;

    if (stepIndex >= steps.length) {
      isPlaying = false;
    }
  }

  drawBars();
}

function generateArray() {
  values = [];
  for (let i = 0; i < totalBars; i++) {
    values.push(floor(random(20, height - 20)));
  }

  originalValues = [...values];
  steps = [];
  stepIndex = 0;
  isPlaying = false;
}

function startBubbleSort() {
  values = [...originalValues];
  steps = getBubbleSortSteps(values);
  values = [...originalValues];
  stepIndex = 0;
  isPlaying = true;
}

function getBubbleSortSteps(arr) {
  const a = [...arr];
  const recordedSteps = [];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      recordedSteps.push({ type: "compare", indices: [j, j + 1] });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        recordedSteps.push({ type: "swap", indices: [j, j + 1] });
      }
    }
  }

  return recordedSteps;
}

function applyStep(step) {
  if (step.type === "swap") {
    const [i, j] = step.indices;
    [values[i], values[j]] = [values[j], values[i]];
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