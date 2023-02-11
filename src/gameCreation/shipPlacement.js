
import Player from "../modules/player"
import Ships from "../modules/ship"
import gameBoard from "./gameBoard";

// two new players created
const player = new Player("player");
const computer = new Player("computer");
const startGame = document.querySelector(".game-start");
export default function ships(){
    gameBoard();// box area for both players

    const getRandomLegalPosition = (j, person)=>{
        // when randomised the ships will get placed either vertical or horizontol
        const randomNumber = Math.floor(Math.random() * 100);
        const newArray = [];
        const addingArray = [1,10,1,10,10,1,10,1];
        const addingDigit = addingArray[Math.floor(Math.random()*addingArray.length)];

        for(let i = 0;i < j;i++){
            newArray.push(randomNumber+(i * addingDigit));// a random number and make a serialised array of it
        }
        if(person.board.shipsPlacement(newArray)) return newArray;// if placement it correct returns
        return getRandomLegalPosition(j, person);// if not recursive function
    }

    const playerShips = ()=>{// creates ships for player at random places
        player.ships = [];
        player.board.hasShipArray = [];
        const gridItemPlayer = document.querySelectorAll(".player-1 .grid-item");
        gridItemPlayer.forEach((grid)=>{
            grid.style.backgroundColor = "rgb(17, 24, 39)";
        })
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

        gridItemPlayer.forEach((grid)=>{// showing the player's ship location
        if(player.board.hasShipArray.includes(parseInt(grid.id, 10))){
            grid.style.backgroundColor = "green";
        }
    });
    }

    const computerShips = ()=>{
        const playerOne = document.querySelector(".player-1");
        playerOne.classList.add("turn"); // disbaling DOM for opposite player
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

    const playerOne = document.querySelector(".player-1");
    const playerTwo = document.querySelector(".player-2");
    playerTwo.classList.add("turn");
    // creating ships randomly for user
    const randomise = document.querySelector(".randomPlayer");
    const butttons = document.querySelector(".buttons");
    randomise.addEventListener("click", ()=>{
        playerShips();
        playerOne.style.pointerEvents = "none";
    })
    // starting the game after placements
    startGame.addEventListener("click", ()=>{
        if(player.board.hasShipArray.length !== 16) return false;// can;t start game without placement of all ships
        butttons.classList.add("hide");
        playerOne.style.pointerEvents = "none";
        computerShips();
        // disbaling DOM buttons
        randomise.disabled = true;
        startGame.disabled = true;
        // playerOne can attack
        playerTwo.classList.remove("turn");
        return 0;
    })
    
}

export {player, computer, startGame}