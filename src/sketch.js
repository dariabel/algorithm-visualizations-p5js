let steps = [];
let stepIndex = 0;
let currentStep = null;
let isPlaying = false;
let sortedIndices = new Set();

const STEP_INTERVAL = 6;

function setup() {
    const canvas = createCanvas(900, 400);
    canvas.parent("canvas-wrapper");

    generateNewArray();

    document
        .getElementById("generate-btn")
        .addEventListener("click", generateNewArray);

    document
        .getElementById("start-btn")
        .addEventListener("click", startBubbleSort);
}

function draw() {
    background(245);

    if (
        isPlaying &&
        stepIndex < steps.length &&
        frameCount % STEP_INTERVAL === 0
    ) {
        applyStep(steps[stepIndex]);
        stepIndex++;
    }

    if (isPlaying && stepIndex >= steps.length) {
        finishAnimation();
    }

    drawBars();
}

function generateNewArray() {
    generateArray();

    steps = [];
    stepIndex = 0;
    currentStep = null;
    isPlaying = false;
    sortedIndices = new Set();

    setStatus("Generated a new array.");
    setControlsDisabled(false);
}

function startBubbleSort() {
    values = [...originalValues];
    steps = getBubbleSortSteps(values);
    stepIndex = 0;
    currentStep = null;
    isPlaying = true;
    sortedIndices = new Set();

    setStatus("Bubble sort is running...");
    setControlsDisabled(true);
}

function applyStep(step) {
    currentStep = step;

    if (step.type === "swap") {
        const [firstIndex, secondIndex] = step.indices;

        [values[firstIndex], values[secondIndex]] = [
            values[secondIndex],
            values[firstIndex]
        ];
    }

    if (step.type === "sorted") {
        sortedIndices.add(step.indices[0]);
    }
}

function finishAnimation() {
    isPlaying = false;
    currentStep = null;

    setStatus("Bubble sort completed.");
    setControlsDisabled(false);
}

function setStatus(message) {
    document.getElementById("status-text").textContent = message;
}

function setControlsDisabled(isDisabled) {
    document.getElementById("generate-btn").disabled = isDisabled;
    document.getElementById("start-btn").disabled = isDisabled;
}
