function getBubbleSortSteps(array) {
    const workingArray = [...array];
    const recordedSteps = [];

    for (let end = workingArray.length - 1; end > 0; end--) {
        let swappedThisPass = false;

        for (let index = 0; index < end; index++) {
            recordedSteps.push({ type: "compare", indices: [index, index + 1] });

            if (workingArray[index] > workingArray[index + 1]) {
                [workingArray[index], workingArray[index + 1]] =
                    [workingArray[index + 1], workingArray[index]];
                recordedSteps.push({ type: "swap", indices: [index, index + 1] });
                swappedThisPass = true;
            }
        }

        recordedSteps.push({ type: "sorted", indices: [end] });

        if (!swappedThisPass) {
            for (let index = end - 1; index >= 0; index--) {
                recordedSteps.push({ type: "sorted", indices: [index] });
            }
            break;
        }
    }

    return recordedSteps;
}

function getInsertionSortSteps(array) {
    const workingArray = [...array];
    const recordedSteps = [];

    for (let index = 1; index < workingArray.length; index++) {
        let current = index;

        while (current > 0) {
            recordedSteps.push({ type: "compare", indices: [current - 1, current] });

            if (workingArray[current - 1] <= workingArray[current]) break;

            [workingArray[current - 1], workingArray[current]] =
                [workingArray[current], workingArray[current - 1]];

            recordedSteps.push({ type: "swap", indices: [current - 1, current] });
            current--;
        }
    }

    for (let index = 0; index < workingArray.length; index++) {
        recordedSteps.push({ type: "sorted", indices: [index] });
    }

    return recordedSteps;
}

function getBinarySearchSteps(array, target) {
    const recordedSteps = [];
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        recordedSteps.push({ type: "visit", indices: [middle], bounds: [left, right] });

        if (array[middle] === target) {
            recordedSteps.push({ type: "found", indices: [middle] });
            return recordedSteps;
        }

        if (array[middle] < target) left = middle + 1;
        else right = middle - 1;
    }

    recordedSteps.push({ type: "not-found", indices: [] });
    return recordedSteps;
}
