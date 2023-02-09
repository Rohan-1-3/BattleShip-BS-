export default function gameBoard(){
    function makeRows(div,rows = 10, cols=10) {
        div.style.setProperty("--grid-rows", rows);
        div.style.setProperty("--grid-cols", cols);
        for (let c = 0; c < (rows * cols); c++) {
          const cell = document.createElement("div");
          div.appendChild(cell);
          cell.classList.add("grid-item");
          cell.id = c;
        };
    };
    
    const playerOne = document.querySelector(".player-1");
    const playerTwo = document.querySelector(".player-2");
    
    makeRows(playerOne);
    makeRows(playerTwo);
}