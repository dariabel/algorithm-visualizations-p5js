function drawBars() {
    const barWidth = width / values.length;

    for (let index = 0; index < values.length; index++) {
        const x = index * barWidth;
        const y = height - values[index];

        setBarColour(index);
        stroke(255);
        rect(x, y, barWidth, values[index]);
    }
}

function setBarColour(index) {
    if (sortedIndices.has(index)) {
        fill(80, 200, 120);
        return;
    }

    if (currentStep?.indices.includes(index)) {
        if (currentStep.type === "swap") {
            fill(235, 90, 90);
        } else {
            fill(255, 180, 70);
        }
        return;
    }

    fill(100, 150, 255);
}
