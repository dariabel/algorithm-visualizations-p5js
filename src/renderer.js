function drawBars() {

    const barWidth = width / values.length;

    for (let i = 0; i < values.length; i++) {

        const x = i * barWidth;
        const y = height - values[i];

        fill(100, 150, 255);
        stroke(255);

        rect(
            x,
            y,
            barWidth,
            values[i]
        );
    }

}
