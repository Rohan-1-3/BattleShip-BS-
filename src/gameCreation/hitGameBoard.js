import { computer, player } from "./shipPlacement";

export default function hitBoard(){

    const checkGameEnd = (person)=>{
        if(person.board.hasShipArray.length === 0){
            const main = document.querySelector(".game");
            main.style.pointerEvents = "none"
        };
    }
    const shotsArray = []
    const gridItem = document.querySelectorAll(".player-1 .grid-item");
    gridItem.forEach((item)=>{
        item.addEventListener("click", ()=>{
            const pos = parseFloat(item.id)
            if(!(shotsArray.includes(pos))){
                shotsArray.push(pos);
                console.log((item.id))
                console.log(player.board)
                const shipArray = player.board.hasShipArray
                if(shipArray.includes(pos)){
                    item.style.backgroundColor = "red"
                    shipArray.splice(shipArray.indexOf(pos),1)
                    checkGameEnd(player);
                }
                else{
                    item.style.backgroundColor = "yellow"
                }
            }
        })
    })

    const shotsArrayComp = []
    const gridItemComp = document.querySelectorAll(".player-2 .grid-item");
    gridItemComp.forEach((item)=>{
        item.addEventListener("click", ()=>{
            const pos = parseFloat(item.id)
            if(!(shotsArrayComp.includes(pos))){
                shotsArrayComp.push(pos);
                console.log((item.id))
                console.log(player.board)
                const shipArray = computer.board.hasShipArray
                if(shipArray.includes(pos)){
                    item.style.backgroundColor = "red"
                    shipArray.splice(shipArray.indexOf(pos),1)
                    checkGameEnd(computer);
                }
                else{
                    item.style.backgroundColor = "yellow"
                }
            }
        })
    } )
}