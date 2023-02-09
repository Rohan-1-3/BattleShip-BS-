/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
import Player from "../modules/player"
import Ships from "../modules/ship"
import gameBoard from "./gameBoard";

// two new players created
const player = new Player("player");
const computer = new Player("computer")
export default function ships(){
    gameBoard();// box area for both players

    const getRandomLegalPosition = (j, person)=>{
        const randomNumber = Math.floor(Math.random() * 100);
        const newArray = [];
        for(let i = 0;i < j;i++){
            newArray.push(randomNumber+i);// a random number and make a serialised array of it
        }
        if(person.board.shipsPlacement(newArray)) return newArray;// if placement it correct returns
        return getRandomLegalPosition(j, person);// if not recursive function
    }

    const playerShips = ()=>{// creates ships for player at random places
        let j = 5;
        for(let i = 0;i < 5;i++){
            const playerShip = new Ships(`ship${i}`,j, getRandomLegalPosition(j, player));
            player.ships.push(playerShip);
            // no ships less than 2 in size
            if(j === 2) continue;
            j--;
        }

        for(let i =0; i<5;i++){
            if(i===0) player.board.hasShipArray = [];// clearing the ship array
            player.board.shipsPlacement(player.ships[i].position);// filling it with proper placements
        }

        const gridItemPlayer = document.querySelectorAll(".player-1 .grid-item");
        gridItemPlayer.forEach((grid)=>{// showing the player's ship location
        if(player.board.hasShipArray.includes(parseInt(grid.id, 10))){
            grid.style.backgroundColor = "green";
        }
    })
    }

    const computerShips = ()=>{
        let j = 5;
        for(let i = 0;i < 5;i++){
            const compShip = new Ships(`ship${i}`,j, getRandomLegalPosition(j, computer))
            computer.ships.push(compShip);
            if(j === 2) continue;
            j--;
        }

        for(let i =0 ; i<5;i++){
            if(i===0) computer.board.hasShipArray = [];
            computer.board.shipsPlacement(computer.ships[i].position);
        }
    }
    // creating ships randomly
    playerShips();
    computerShips();
}

export {player, computer}