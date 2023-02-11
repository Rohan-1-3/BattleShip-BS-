import { computer, player } from "./shipPlacement";

export default function hitBoard(){

    const checkGameEnd = (person)=>{
        if(person.board.hasShipArray.length === 0){
            const resetButton = document.querySelector(".reset");
            resetButton.style.pointerEvents = "all";
            const winDisplay = document.querySelector(".win-display");
            winDisplay.textContent = `${person.name} lost`;
            winDisplay.classList.add("show")
            resetButton.classList.add("show");
            const main = document.querySelector(".game");
            main.style.pointerEvents = "none"; // after game ends DOM allowed
            return true;
        };
        return false;
    }

    // array for recording shots
    const shotsArray = [];
    const shotsArrayComp = [];
    const playerOne = document.querySelector(".player-1");
    const playerTwo = document.querySelector(".player-2");
    let hitShip = false;
    let prevpos;
  
    const smartHittingShips = (pos, newPos)=>{
        // loop for finding the which ship beens hit
        for(let i = 0;i < 5;i++){
            if(player.ships[i].position.includes(pos)){
                if(player.ships[i].hits === player.ships[i].length-1) {
                    // once all part of ship been destroyed computer start making random moves
                    hitShip = false;
                    return newPos;
                }
                const hittedShip = player.ships[i].position;// arrayPosition of hitted Ship
                player.ships[i].hit(pos);                
                return hittedShip[0]; // returns hitted Ships array element one by one
            }
        }
    }

    const computerPlay = ()=>{// random computer plays
        const playersBoard = player.board.boardPositionArray;
        const randomNumber = Math.floor(Math.random()*playersBoard.length);
        let pos = playersBoard[randomNumber];
        // smart AI;
        if(hitShip){
            pos = smartHittingShips(prevpos, pos); // getting hitted Ships part
        }
        // removes the position from players board after shots
       playersBoard.splice(playersBoard.indexOf(pos), 1);
            if(!(shotsArrayComp.includes(pos))){// no hitting same position twice
                prevpos = pos;
                const item = document.getElementById(`${pos}`);
                shotsArrayComp.push(pos);// pushing hit position to array
                const shipArray = player.board.hasShipArray;
                if(shipArray.includes(pos)){// if ship gets hit div color changes to red
                    // once hit smart AI turns true for 
                    hitShip = true;
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
                console.log(player);
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