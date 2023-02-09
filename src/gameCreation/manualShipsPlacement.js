import Ships from "../modules/ship";
import { player, startGame } from "./shipPlacement";

export default function someFunction(){
    const gridItemPlayer = document.querySelectorAll(".player-1 .grid-item");
    console.log("ok")
    let j = 5;
    let count =0;
    const allthis = ()=>{
        gridItemPlayer.forEach((grid)=>{
            if(player.board.hasShipArray.includes(parseInt(grid.id, 10)))
            grid.classList.add("green");
        })
    }
    
    gridItemPlayer.forEach((grid)=>{
        grid.addEventListener("click", ()=>{
            
            const newArray = []
            for(let i = 0;i < j;i++){
                const newArrayElement = parseInt(grid.id, 10)+i;
                newArray.push(newArrayElement);
            }
            // console.log(!(player.board.shipsPlacement(newArray)))
            if(!(player.board.shipsPlacement(newArray))) return false;
            const playerShip = new Ships(`ship-${count}`, j, newArray)
            player.ships.push(playerShip);
            console.log(player)
            allthis();
            count++;
            if(count === 5) startGame.click();
            
            if(j === 2) return 0;
            j--;
            return true;
        })
        grid.addEventListener("mouseover", ()=>{
            if(grid.classList[1] === "green") return false
            for(let i = 1; i < j; i++){
            const gridLine = document.getElementById(`${parseInt(grid.id, 10)+i}`);
            if(gridLine.classList[1] === "green") return false;
            gridLine.style.backgroundColor = "green";
            }
            grid.style.backgroundColor = "green";
        });
        grid.addEventListener("mouseleave", ()=>{
            if(grid.classList[1] === "green") return false
            for(let i = 1; i < 5; i++){
                const gridLine = document.getElementById(`${parseInt(grid.id, 10)+i}`);
                if(gridLine.classList[1] === "green") return false;
                gridLine.style.backgroundColor = "white";
            }
            
            grid.style.backgroundColor = "white";
        });
    });
}