const container = document.querySelector("#grid");
const containerWidth = container.offsetWidth;
const length = 64;
const width = 64;

const colorPickerButton = document.querySelector("#color-picker-button")
const hiddenColorPicker = document.querySelector("#color-picker")

let backgroundColor = "#000000";





colorPickerButton.addEventListener("click", () => {
    hiddenColorPicker.click()
    hiddenColorPicker.addEventListener("input",() => {
        backgroundColor = hiddenColorPicker.value
    })
})

let cellSize = containerWidth / length;


let isMouseDown = false






for (let i = 0; i <= (length * width)-1; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell")

    cell.addEventListener("mousedown", () => {
        isMouseDown = true
        cell.classList.add("active");
        cell.style.background = backgroundColor
    });

    document.addEventListener("mouseup",() => {
        isMouseDown = false
    })

    cell.addEventListener("mousemove", () => {
        if (isMouseDown) {
            cell.style.background = backgroundColor;
        }
    })
  
 
    container.appendChild(cell);
}
