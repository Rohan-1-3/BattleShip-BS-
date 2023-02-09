/* eslint-disable no-param-reassign */
import Player from "../modules/player"
import Ships from "../modules/ship"
import gameBoard from "./gameBoard";

const player = new Player("player");
const computer = new Player("computer")
export default function ships(){
    gameBoard();

    const getRandomLegalPosition = (j, person)=>{
        const randomNumber = Math.floor(Math.random() * 100);
        const newArray = [];
        for(let i = 0;i < j;i++){
            newArray.push(randomNumber+i);
        }
        if(person.board.shipsPlacement(newArray)) return newArray;
        return getRandomLegalPosition(j, person);
    }

    const playerShips = ()=>{
        let j = 5;
        for(let i = 0;i < 5;i++){
            // console.log(getRandomLegalPosition(j));
            const playerShip = new Ships(`ship${i}`,j, getRandomLegalPosition(j, player))
            player.ships.push(playerShip)
            if(j === 2) continue;
            j--;
        }

        for(let i =0 ; i<5;i++){
            if(i===0) player.board.hasShipArray = [];
            console.log(player.board.shipsPlacement(player.ships[i].position));
        }

        const gridItemPlayer = document.querySelectorAll(".player-1 .grid-item");
        gridItemPlayer.forEach((grid)=>{
        if(player.board.hasShipArray.includes(parseInt(grid.id, 10))){
            grid.style.backgroundColor = "green";
        }
    })
    }

    const computerShips = ()=>{
        let j = 5;
        for(let i = 0;i < 5;i++){
            // console.log(getRandomLegalPosition(j));
            const compShip = new Ships(`ship${i}`,j, getRandomLegalPosition(j, computer))
            computer.ships.push(compShip)
            console.log("ok")
            if(j === 2) continue;
            j--;
        }

        for(let i =0 ; i<5;i++){
            if(i===0) computer.board.hasShipArray = [];
            console.log(computer.board.shipsPlacement(computer.ships[i].position));
        }

        const gridItemComp = document.querySelectorAll(".player-2 .grid-item");
        gridItemComp.forEach((grid)=>{
        if(computer.board.hasShipArray.includes(parseInt(grid.id, 10))){
            grid.style.backgroundColor = "green";
        }
    })
    }

    playerShips();
    computerShips();

    console.log(computer)
}

export {player, computer}