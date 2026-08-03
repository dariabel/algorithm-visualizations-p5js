function getBubbleSortSteps(array) {
    const workingArray = [...array];
    const recordedSteps = [];

    for (let end = workingArray.length - 1; end > 0; end--) {
        for (let index = 0; index < end; index++) {
            recordedSteps.push({
                type: "compare",
                indices: [index, index + 1]
            });

            if (workingArray[index] > workingArray[index + 1]) {
                [workingArray[index], workingArray[index + 1]] = [
                    workingArray[index + 1],
                    workingArray[index]
                ];

                recordedSteps.push({
                    type: "swap",
                    indices: [index, index + 1]
                });
            }
        }

        recordedSteps.push({
            type: "sorted",
            indices: [end]
        });
    }

    recordedSteps.push({
        type: "sorted",
        indices: [0]
    });

    return recordedSteps;
}
