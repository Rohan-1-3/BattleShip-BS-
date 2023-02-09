import Player from "../modules/player"
import Ships from "../modules/ship"
import gameBoard from "./gameBoard";


export default function ships(){
    gameBoard();
    const player = new Player("player");
    const computer = new Player("computer");

    const carrier = new Ships("carrier", 5, [0,1,2,3,4]);
    player.ships.push(carrier);
    const battleShip = new Ships("battleship", 4, [80,81,82,83])
    player.ships.push(battleShip);
    const destroyer = new Ships("destroyer", 3, [90,91,92])
    player.ships.push(destroyer)
    const patrolBoat = new Ships("patrolboat", 2, [21,11])
    player.ships.push(patrolBoat);
    const patrolBoat2 = new Ships("patrolboat2", 2, [68,69])
    player.ships.push(patrolBoat2);

    for(let i = 0;i<player.ships.length;i++){
        player.board.shipsPlacement(player.ships[i].position);
    }
    console.log(player)
    

    const gridItem = document.querySelectorAll(".player-1 .grid-item");
    gridItem.forEach((grid)=>{
        if(player.board.hasShipArray.includes(parseInt(grid.id, 10))){
            grid.style.backgroundColor = "green";
        }
    })
}