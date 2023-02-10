/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { computer, player } from "./shipPlacement";

export default function hitBoard(){

    const checkGameEnd = (person)=>{
        if(person.board.hasShipArray.length === 0){
            const main = document.querySelector(".game");
            main.style.pointerEvents = "none"; // after game ends DOM allowed
            console.log(`${person.name} Lost`); // idisplays
            return true;
        };
        return false;
    }

    // array for recording shots
    const shotsArray = [];
    const shotsArrayComp = [];
    const playerOne = document.querySelector(".player-1");
    const playerTwo = document.querySelector(".player-2");
  
    

    const computerPlay = ()=>{// random computer plays
        const randomNumber = Math.floor(Math.random()*player.board.boardPositionArray.length)
        const pos = player.board.boardPositionArray[randomNumber];
        // removes the position from players board after shots
        player.board.boardPositionArray.splice(randomNumber, 1);
            if(!(shotsArrayComp.includes(pos))){// no hitting same position twice
                const item = document.getElementById(`${pos}`);
                shotsArrayComp.push(pos);// pushing hit position to array
                const shipArray = player.board.hasShipArray;
                if(shipArray.includes(pos)){// if ship gets hit div color changes to red
                    item.style.backgroundColor = "red";
                    shipArray.splice(shipArray.indexOf(pos),1); // removes position from shipArray
                    if(checkGameEnd(player)) return 0;// if game ends no switching turns
                }
                else{// if not hit div chnages to yellow
                    item.style.backgroundColor = "yellow";
                }
                // changes turn to other player
                playerOne.classList.add("turn");
                playerTwo.classList.remove("turn");
            }
            return 0;
    }

    const gridItemComp = document.querySelectorAll(".player-2 .grid-item");
    gridItemComp.forEach((item)=>{
        item.addEventListener("click", ()=>{
            const pos = parseFloat(item.id);
            if(!(shotsArray.includes(pos))){// can't hit same position twice
                shotsArray.push(pos);
                const shipArray = computer.board.hasShipArray;
                if(shipArray.includes(pos)){
                    item.style.backgroundColor = "red";// hit signalling
                    shipArray.splice(shipArray.indexOf(pos),1);
                    if(checkGameEnd(computer)) return 0;// if game ends no switching turns
                }
                else{
                    item.style.backgroundColor = "yellow";
                }
                // turn switching
                playerTwo.classList.add("turn");
                playerOne.classList.remove("turn");
                // computer attacks after 1 sec
                setTimeout(() => {
                    computerPlay();
                }, 1000);
            }
            return 0;
        })
    })
}