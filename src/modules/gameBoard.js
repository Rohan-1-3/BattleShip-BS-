class GameBoard{
    constructor(){
        this.boardPositionArray = [];
        this.hasShipArray = [];
        this.boardCreate();// instantly creates a board
    }

    boardCreate(){
        for(let i = 0;i<100;i++){
            this.boardPositionArray.push(i);
        }
    }

    receiveAttack(pos){// receives attack and marks if hit or miss
        if(!this.boardPositionArray.includes(pos)) return "out of the box";
        if(this.boardPositionArray.includes(pos)){
            this.boardPositionArray.splice(pos,1);
        }
        return this.checkingIfHit(pos);
    }

    checkingIfHit(pos){
        if(this.hasShipArray.includes(pos)){// checking hit, if hit removes block from shipArray
            this.hasShipArray.splice(this.hasShipArray.indexOf(pos),1);
            return true;
        }
        return false;
    }

    gameEnd(){// check if all ships sunk
        return !!(this.hasShipArray.length === 0);
    }

    shipsPlacement(shipsArr){
        const shortedShipsArr = shipsArr.sort((a, b) =>a - b);// sorting
        // border of the board
        const borderHorizontal = [9,19,29,39,49,59,69,79,89,99];
        const borderVertical = [90,91,92,93,94,95,96,97,98,99];
        for(let i = 0; i < shortedShipsArr.length-1;i++){
            // placement beyond board
            if(shipsArr[i]<0) return false;
    
            if(!this.boardPositionArray.includes(shortedShipsArr[i])) return false;
            // placement in random order
            if(!((shortedShipsArr[i+1] - shortedShipsArr[i]) === 1 
            || (shortedShipsArr[i+1] - shortedShipsArr[i]) === 10)) return false;
            // placement crosses the vertical and horizontol border
            if(borderHorizontal.includes(shortedShipsArr[i]) 
            || borderVertical.includes(shortedShipsArr[i])){
                if(!(i === shortedShipsArr.length || i === 0)) return false;
            }
            // no overlapping of ships
            if(this.hasShipArray.includes(shipsArr[i])) return false;
        }
        // adds ship to fresh location
        this.hasShipArray.push(...shortedShipsArr);
        return true;
    }
}

export default GameBoard