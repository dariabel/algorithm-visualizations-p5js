# Algorithm Visualizations with p5.js

An interactive educational tool for exploring classic sorting and searching algorithms step by step.

## Algorithms

- **Bubble Sort** - Average/Worst: `O(n²)`, Space: `O(1)`
- **Insertion Sort** - Average/Worst: `O(n²)`, Space: `O(1)`
- **Binary Search** - Average/Worst: `O(log n)`, Space: `O(1)` for this iterative implementation

## Features

- Bubble Sort, Insertion Sort, and Binary Search visualizations
- Random array generation
- Adjustable animation speed
- Pause, resume, and reset controls
- Live comparison/check and swap counters
- Progress tracking
- Colour-coded algorithm states
- Responsive interface

## Colour Guide

- Blue: unsorted or inactive
- Orange: comparing or checking
- Red: swapping
- Green: sorted or found

## Running Locally

1. Clone or download the repository.
2. Open `index.html` in a modern browser.
3. Select an algorithm and generate an array.
4. Press **Start**.

An internet connection is required because p5.js is loaded from a CDN.

## Project Structure

```text
algorithm-visualizations-p5js/
├── index.html
├── style.css
├── README.md
├── LICENSE
├── .gitignore
└── src/
    ├── algorithms.js
    ├── array.js
    ├── renderer.js
    └── sketch.js
```

## How It Works

The algorithms record actions such as comparisons and swaps instead of immediately changing the displayed array. The visualizer then plays those actions back one at a time. This keeps the algorithm logic separate from the animation logic and makes the project easier to extend.

## Educational Purpose

This project is intended as a simple teaching and learning resource for connecting algorithm code with concepts such as comparisons, swaps, search-space reduction, progress, and computational complexity.

## Future Ideas

- Selection Sort
- Merge Sort
- Quick Sort
- Linear Search
- Pathfinding algorithms
- Manual step-forward mode
- Array-size controls

## Built With

- JavaScript
- p5.js
- HTML5
- CSS3

## License

Licensed under the MIT License. See `LICENSE` for details.
