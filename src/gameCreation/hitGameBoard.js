/* eslint-disable no-param-reassign */
import { computer, player } from "./shipPlacement";

export default function hitBoard(){

    const checkGameEnd = (person)=>{
        if(person.board.hasShipArray.length === 0){
            const main = document.querySelector(".game");
            main.style.pointerEvents = "none"
            return true;
        };
        return false;
    }

    const shotsArray = [];
    const playerOne = document.querySelector(".player-1");
    const playerTwo = document.querySelector(".player-2");
    playerOne.classList.add("turn")
    const shotsArrayComp = []

    const computerPlay = ()=>{
        const randomNumber = Math.floor(Math.random()*computer.board.boardPositionArray.length)
        const pos = computer.board.boardPositionArray[randomNumber];
        computer.board.boardPositionArray.splice(randomNumber,1)
            if(!(shotsArrayComp.includes(pos))){
                const item = document.getElementById(`${pos}`)
                shotsArrayComp.push(pos);
                const shipArray = player.board.hasShipArray
                if(shipArray.includes(pos)){
                    item.style.backgroundColor = "red"
                    shipArray.splice(shipArray.indexOf(pos),1)
                    if(checkGameEnd(player)) return 0;
                }
                else{
                    item.style.backgroundColor = "yellow"
                }
                playerOne.classList.add("turn");
                playerTwo.classList.remove("turn");
            }
            return 0;
    }

    const gridItemComp = document.querySelectorAll(".player-2 .grid-item");
    gridItemComp.forEach((item)=>{
        item.addEventListener("click", ()=>{
            const pos = parseFloat(item.id)
            if(!(shotsArray.includes(pos))){
                shotsArray.push(pos);
                const shipArray = computer.board.hasShipArray
                if(shipArray.includes(pos)){
                    item.style.backgroundColor = "red"
                    shipArray.splice(shipArray.indexOf(pos),1)
                    if(checkGameEnd(computer)) return 0;
                }
                else{
                    item.style.backgroundColor = "yellow"
                }
                playerTwo.classList.add("turn");
                playerOne.classList.remove("turn");
                setTimeout(() => {
                    computerPlay();
                }, 1000);
            }
            return 0;
        })
    })
}