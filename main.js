const container = document.querySelector("#grid");
const containerWidth = container.offsetWidth;
let length = 4;
let width = 4;

let gridSize = 300;

const colorPickerButton = document.querySelector("#color-picker-button");
const hiddenColorPicker = document.querySelector("#color-picker");
const slider = document.querySelector(".slider");
const sliderText = document.querySelector("#sliderText")

const eraserButton = document.querySelector("#eraser");
const clearButton = document.querySelector("#clear");

let backgroundColor = "black";
let isMouseDown = false;

// Function to create cells dynamically
function createCell() {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.height = `${gridSize / length}px`;
    cell.style.width = `${gridSize / width}px`;

    cell.addEventListener("mousedown", () => {
        isMouseDown = true;
        cell.style.background = backgroundColor;
    });

    document.addEventListener("mouseup", () => {
        isMouseDown = false;
    });

    cell.addEventListener("mousemove", () => {
        if (isMouseDown) {
            cell.style.background = backgroundColor;
        }
    });

    return cell;
}

// Function to adjust grid size smoothly
function updateGrid() {
    const totalCells = length * width;
    const currentCells = container.children.length;

    // Add or remove cells to match the new size
    if (currentCells < totalCells) {
        for (let i = 0; i < totalCells - currentCells; i++) {
            container.appendChild(createCell());
        }
    } else if (currentCells > totalCells) {
        for (let i = 0; i < currentCells - totalCells; i++) {
            container.lastChild.remove();
        }
    }

    // Update all cells' size
    const cells = container.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.height = `${gridSize / length}px`;
        cell.style.width = `${gridSize / width}px`;
    });
}

// Initial grid creation
updateGrid();

// Debounce function for performance
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Handle slider changes smoothly
slider.addEventListener("input", debounce(() => {
    length = slider.value;
    width = slider.value;

    sliderText.textContent = `Size: ${length} x ${width}`;
    updateGrid();
}, 500)); // Debounce of 100ms for smoother resizing

// Handle color picker changes
colorPickerButton.addEventListener("click", () => {
    hiddenColorPicker.click();
    hiddenColorPicker.addEventListener("input", () => {
        backgroundColor = hiddenColorPicker.value;
    });
});

// Eraser functionality
eraserButton.addEventListener("click", () => {
    backgroundColor = getComputedStyle(document.querySelector(".cell")).backgroundColor;
});

// Clear grid functionality
clearButton.addEventListener("click", () => {
    container.querySelectorAll(".cell").forEach(cell => {
        cell.style.background = ""; // Reset background
    });
});


