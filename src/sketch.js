let steps = [];
let stepIndex = 0;
let currentStep = null;
let isPlaying = false;
let isPaused = false;
let sortedIndices = new Set();
let comparisonCount = 0;
let swapCount = 0;
let animationSpeed = 15;
let lastStepTime = 0;

function setup() {
    const canvas = createCanvas(900, 400);
    canvas.parent("canvas-wrapper");

    generateNewArray();

    document.getElementById("generate-btn").addEventListener("click", generateNewArray);
    document.getElementById("start-btn").addEventListener("click", startBubbleSort);
    document.getElementById("pause-btn").addEventListener("click", togglePause);
    document.getElementById("reset-btn").addEventListener("click", resetVisualization);
    document.getElementById("speed-slider").addEventListener("input", updateSpeed);
}

function draw() {
    background(245);

    if (isPlaying && !isPaused && shouldAdvanceStep()) {
        advanceAnimation();
        lastStepTime = millis();
    }

    drawBars();
}

function shouldAdvanceStep() {
    const delayMilliseconds = map(animationSpeed, 1, 30, 500, 20);
    return millis() - lastStepTime >= delayMilliseconds;
}

function advanceAnimation() {
    if (stepIndex >= steps.length) {
        finishAnimation();
        return;
    }

    applyStep(steps[stepIndex]);
    stepIndex++;
    updateProgress();

    if (stepIndex >= steps.length) finishAnimation();
}

function generateNewArray() {
    generateArray();
    clearAnimationState();
    setStatus("Generated a new array.");
    updateStatistics();
    updateControls();
}

function startBubbleSort() {
    values = [...originalValues];
    steps = getBubbleSortSteps(values);
    stepIndex = 0;
    currentStep = null;
    isPlaying = true;
    isPaused = false;
    sortedIndices = new Set();
    comparisonCount = 0;
    swapCount = 0;
    lastStepTime = millis();

    setStatus("Bubble sort is running.");
    updateStatistics();
    updateControls();
}

function togglePause() {
    if (!isPlaying) return;

    isPaused = !isPaused;
    setStatus(isPaused ? "Bubble sort paused." : "Bubble sort resumed.");

    if (!isPaused) lastStepTime = millis();
    updateControls();
}

function resetVisualization() {
    values = [...originalValues];
    clearAnimationState();
    setStatus("Visualization reset.");
    updateStatistics();
    updateControls();
}

function clearAnimationState() {
    steps = [];
    stepIndex = 0;
    currentStep = null;
    isPlaying = false;
    isPaused = false;
    sortedIndices = new Set();
    comparisonCount = 0;
    swapCount = 0;
    lastStepTime = 0;
}

function applyStep(step) {
    currentStep = step;

    if (step.type === "compare") {
        comparisonCount++;
        setStatus(`Comparing positions ${step.indices[0]} and ${step.indices[1]}.`);
    }

    if (step.type === "swap") {
        const [firstIndex, secondIndex] = step.indices;
        [values[firstIndex], values[secondIndex]] = [values[secondIndex], values[firstIndex]];
        swapCount++;
        setStatus(`Swapping positions ${firstIndex} and ${secondIndex}.`);
    }

    if (step.type === "sorted") {
        sortedIndices.add(step.indices[0]);
        setStatus(`Position ${step.indices[0]} is now sorted.`);
    }

    updateStatistics();
}

function finishAnimation() {
    isPlaying = false;
    isPaused = false;
    currentStep = null;

    for (let index = 0; index < values.length; index++) sortedIndices.add(index);

    setStatus("Bubble sort completed.");
    updateProgress();
    updateControls();
}

function updateSpeed(event) {
    animationSpeed = Number(event.target.value);
    document.getElementById("speed-value").textContent = animationSpeed;
}

function updateStatistics() {
    document.getElementById("comparisons-value").textContent = comparisonCount;
    document.getElementById("swaps-value").textContent = swapCount;
    updateProgress();
}

function updateProgress() {
    const progress = steps.length === 0 ? 0 : Math.round((stepIndex / steps.length) * 100);
    document.getElementById("progress-value").textContent = `${progress}%`;
}

function updateControls() {
    const generateButton = document.getElementById("generate-btn");
    const startButton = document.getElementById("start-btn");
    const pauseButton = document.getElementById("pause-btn");

    generateButton.disabled = isPlaying;
    startButton.disabled = isPlaying;
    pauseButton.disabled = !isPlaying;
    pauseButton.textContent = isPaused ? "Resume" : "Pause";
}

function setStatus(message) {
    document.getElementById("status-text").textContent = message;
}
