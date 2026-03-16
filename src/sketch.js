function setup() {
    const canvas = createCanvas(900, 400);
    canvas.parent("canvas-wrapper");
  }
  
  function draw() {
    background(245);
  
    fill(40);
    noStroke();
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Algorithm visualizer coming next", width / 2, height / 2);
  }