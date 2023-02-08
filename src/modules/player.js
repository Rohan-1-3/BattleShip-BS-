import GameBoard from "./gameBoard";

class Player{
    constructor(name){
        this.name = name;
        this.ships = [];
        this.board = new GameBoard;
    }
}

export default Player