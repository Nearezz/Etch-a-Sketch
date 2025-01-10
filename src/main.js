const container = document.querySelector("#grid");
const containerWidth = container.offsetWidth;

const length = 64;
const width = 64;

let cellSize = containerWidth / length;


let isMouseDown = false

for (let i = 0; i <= (length * width)-1; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell")

    cell.addEventListener("mousedown", () => {
        isMouseDown = true
        cell.classList.add("active");
        cell.style.background = "rgb(116, 79, 79)";
    });

    document.addEventListener("mouseup",() => {
        isMouseDown = false
    })

    cell.addEventListener("mousemove", () => {
        if (isMouseDown) {
            cell.style.background = "rgb(0, 0, 0)";
        }
    })
  
 
    container.appendChild(cell);
}
