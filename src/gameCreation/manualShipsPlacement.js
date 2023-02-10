/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import Ships from "../modules/ship";
import { player, startGame } from "./shipPlacement";

export default function someFunction(){
    const gridItemPlayer = document.querySelectorAll(".player-1 .grid-item");
    const rotate = document.querySelector(".rotate");
    let direction = 1;
    rotate.addEventListener("click", ()=>{
        if(direction === 1){
            direction = 10;
        }else{
            direction = 1;
        }
    })
    let j = 5;
    let count =0;
    const allthis = ()=>{
        gridItemPlayer.forEach((grid)=>{
            grid.style.backgroundColor = " ";
            grid.style.border = "1px solid red"
            if(player.board.hasShipArray.includes(parseInt(grid.id, 10)))
            grid.classList.add("green");
        })
    }
    
    gridItemPlayer.forEach((grid)=>{
        grid.addEventListener("click", ()=>{
            
            const newArray = []
            for(let i = 0;i < j;i++){
                const newArrayElement = parseInt(grid.id, 10)+(i*direction);
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
            for(let i = 1; i < j; i++){
                const gridLine = document.getElementById(`${parseInt(grid.id, 10)+(i*direction)}`);
                if(gridLine.classList[1] === "green") return false;
                gridLine.style.border = "2px solid green";
            }
            grid.style.border = "2px solid green";
        });
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