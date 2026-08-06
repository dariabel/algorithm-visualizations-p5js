let values = [];
let originalValues = [];
const TOTAL_BARS = 50;

function generateArray() {
    values = [];
    for (let index = 0; index < TOTAL_BARS; index++) {
        values.push(floor(random(20, height - 20)));
    }
    originalValues = [...values];
}
