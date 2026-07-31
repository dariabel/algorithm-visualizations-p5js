function setup() {

    const canvas = createCanvas(900, 400);

    canvas.parent("canvas-wrapper");

    generateArray();

    document
        .getElementById("generate-btn")
        .addEventListener("click", generateArray);

}

function draw() {

    background(245);

    drawBars();

}
