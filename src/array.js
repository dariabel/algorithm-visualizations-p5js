let values = [];

const TOTAL_BARS = 50;

function generateArray() {
    values = [];

    for (let i = 0; i < TOTAL_BARS; i++) {
        values.push(floor(random(20, height - 20)));
    }
}
