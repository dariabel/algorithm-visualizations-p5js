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
let selectedAlgorithm = "bubble";
let searchTarget = null;

function setup() {
    const canvas = createCanvas(900, 400);
    canvas.parent("canvas-wrapper");

    generateNewArray();

    document.getElementById("generate-btn").addEventListener("click", generateNewArray);
    document.getElementById("start-btn").addEventListener("click", startSelectedAlgorithm);
    document.getElementById("pause-btn").addEventListener("click", togglePause);
    document.getElementById("reset-btn").addEventListener("click", resetVisualization);
    document.getElementById("speed-slider").addEventListener("input", updateSpeed);
    document.getElementById("algorithm-select").addEventListener("change", changeAlgorithm);
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
    updateStatistics();

    if (stepIndex >= steps.length) finishAnimation();
}

function changeAlgorithm(event) {
    selectedAlgorithm = event.target.value;
    document.getElementById("search-control")
        .classList.toggle("hidden", selectedAlgorithm !== "binary");
    generateNewArray();
}

function generateNewArray() {
    generateArray();

    if (selectedAlgorithm === "binary") {
        values.sort((a, b) => a - b);
        originalValues = [...values];
        searchTarget = values[floor(random(values.length))];
        document.getElementById("search-target").value = searchTarget;
    }

    clearAnimationState();
    setStatus("Generated a new array.");
    updateStatistics();
    updateControls();
}

function startSelectedAlgorithm() {
    values = [...originalValues];
    clearAnimationState();

    if (selectedAlgorithm === "bubble") {
        steps = getBubbleSortSteps(values);
        setStatus("Bubble sort is running.");
    } else if (selectedAlgorithm === "insertion") {
        steps = getInsertionSortSteps(values);
        setStatus("Insertion sort is running.");
    } else {
        values.sort((a, b) => a - b);
        originalValues = [...values];
        searchTarget = Number(document.getElementById("search-target").value);
        steps = getBinarySearchSteps(values, searchTarget);
        setStatus(`Binary search is looking for ${searchTarget}.`);
    }

    isPlaying = true;
    lastStepTime = millis();
    updateControls();
}

function togglePause() {
    if (!isPlaying) return;
    isPaused = !isPaused;
    setStatus(isPaused ? "Visualization paused." : "Visualization resumed.");
    lastStepTime = millis();
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
        [values[firstIndex], values[secondIndex]] =
            [values[secondIndex], values[firstIndex]];
        swapCount++;
        setStatus(`Swapping positions ${firstIndex} and ${secondIndex}.`);
    }

    if (step.type === "sorted") sortedIndices.add(step.indices[0]);

    if (step.type === "visit") {
        comparisonCount++;
        const [left, right] = step.bounds;
        setStatus(`Checking index ${step.indices[0]} in range ${left}-${right}.`);
    }

    if (step.type === "found") {
        sortedIndices.add(step.indices[0]);
        setStatus(`Target ${searchTarget} found at index ${step.indices[0]}.`);
    }

    if (step.type === "not-found") {
        setStatus(`Target ${searchTarget} was not found.`);
    }
}

function finishAnimation() {
    isPlaying = false;
    isPaused = false;

    if (selectedAlgorithm !== "binary") {
        for (let index = 0; index < values.length; index++) sortedIndices.add(index);
        setStatus(selectedAlgorithm === "bubble"
            ? "Bubble sort completed."
            : "Insertion sort completed.");
    }

    updateStatistics();
    updateControls();
}

function updateSpeed(event) {
    animationSpeed = Number(event.target.value);
    document.getElementById("speed-value").textContent = animationSpeed;
}

function updateStatistics() {
    document.getElementById("comparisons-value").textContent = comparisonCount;
    document.getElementById("swaps-value").textContent =
        selectedAlgorithm === "binary" ? "-" : swapCount;

    const progress = steps.length === 0
        ? 0
        : Math.round((stepIndex / steps.length) * 100);

    document.getElementById("progress-value").textContent = `${progress}%`;
}

function updateControls() {
    document.getElementById("generate-btn").disabled = isPlaying;
    document.getElementById("start-btn").disabled = isPlaying;
    document.getElementById("pause-btn").disabled = !isPlaying;
    document.getElementById("algorithm-select").disabled = isPlaying;
    document.getElementById("search-target").disabled = isPlaying;
    document.getElementById("pause-btn").textContent = isPaused ? "Resume" : "Pause";
}

function setStatus(message) {
    document.getElementById("status-text").textContent = message;
}
