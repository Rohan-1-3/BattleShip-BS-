
import Ships from "../modules/ship";
import { player, startGame } from "./shipPlacement";

function manualPlacement(){
    const gridItemPlayer = document.querySelectorAll(".player-1 .grid-item");
    const rotate = document.querySelector(".rotate");
    // for changeing the direction of the ships
    let direction = 1;
    rotate.addEventListener("click", ()=>{
        if(direction === 1){
            direction = 10;
        }else{
            direction = 1;
        }
    });
    // displays the playerOne ships location
    const shipsDisplay = ()=>{
        gridItemPlayer.forEach((grid)=>{
            grid.style.backgroundColor = " ";
            grid.style.border = "1px solid red"
            if(player.board.hasShipArray.includes(parseInt(grid.id, 10)))
            grid.classList.add("green");
        })
    }

    let j = 5;
    let count =0;
    gridItemPlayer.forEach((grid)=>{
        grid.addEventListener("click", ()=>{
            // takes array accr to users request
            const newArray = [];
            for(let i = 0;i < j;i++){
                const newArrayElement = parseInt(grid.id, 10)+(i*direction);
                newArray.push(newArrayElement);
            }
            // if not valid can't place
            if(!(player.board.shipsPlacement(newArray))) return false;
            // when valid adds the ship and pushes it in
            const playerShip = new Ships(`ship-${count}`, j, newArray)
            player.ships.push(playerShip);
            shipsDisplay();// displays
            // when ships count reach 5 starts game automatically
            count++;
            if(count === 5) startGame.click();
            // no ships less than 2 in size
            if(j === 2) return 0;
            // decreases the ships display to user after each click
            j--;
            return true;
        });
        // for displaying the range of ships that can be placed to the user 
        grid.addEventListener("mouseover", ()=>{
            for(let i = 1; i < j; i++){
                const gridLine = document.getElementById(`${parseInt(grid.id, 10)+(i*direction)}`);
                if(gridLine.classList[1] === "green") return false;
                gridLine.style.border = "2px solid green";
            }
            grid.style.border = "2px solid green";
        });
        // removes the display when user's mouse moves away from the div
        grid.addEventListener("mouseleave", ()=>{
            for(let i = 1; i < 5; i++){
                const gridLine = document.getElementById(`${parseInt(grid.id, 10)+(i*direction)}`);
                if(gridLine.classList[1] === "green") return false;
                gridLine.style.border = "1px solid red";
            }
            grid.style.border = "1px solid red";
        });
    });
}

export default manualPlacement;