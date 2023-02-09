import Player from "../modules/player"
import Ships from "../modules/ship"
import gameBoard from "./gameBoard";


export default function ships(){
    gameBoard();
    const player = new Player("player");
    const computer = new Player("computer");

    const carrier = new Ships("carrier", 5, 1, [0,1,2,3,4]);
    player.ships.push(carrier);
    const battleShip = new Ships("battleship", 4, 2, [80,81,82,83])
    player.ships.push(battleShip);
    const destroyer = new Ships("battleship", 3, 2, [90,91,92])
    player.ships.push(destroyer)
    const patrolBoat = new Ships("battleship", 2, 2, [21,11])
    player.ships.push(patrolBoat);

    player.board.shipsPlacement(player.ships[0].position);
    player.board.shipsPlacement(player.ships[1].position);
    player.board.shipsPlacement(player.ships[2].position);
    player.board.shipsPlacement(player.ships[3].position);
    console.log(player)

    const gridItem = document.querySelectorAll(".player-1 .grid-item");
    gridItem.forEach((grid)=>{
        if(player.board.hasShipArray.includes(parseInt(grid.id, 10))){
            grid.style.backgroundColor = "green";
        }
    })
}