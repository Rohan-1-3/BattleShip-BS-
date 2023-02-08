class GameBoard{
    constructor(){
        this.boardPositionArray = [];
        this.hasShipArray = [];
        this.boardCreate();
    }

    boardCreate(){
        for(let i = 0;i<100;i++){
            this.boardPositionArray.push(i);
        }
    }

    receiveAttack(pos){
        if(!this.boardPositionArray.includes(pos)) return "out of the box";
        if(this.boardPositionArray.includes(pos)){
            this.boardPositionArray.splice(pos,1);
        }
        return this.checkingIfHit(pos);
    }

    checkingIfHit(pos){
        if(this.hasShipArray.includes(pos)){
            this.hasShipArray.splice(this.hasShipArray.indexOf(pos),1);
            return true;
        }
        return false;
    }

    gameEnd(){
        return !!(this.hasShipArray.length === 0);
    }

    shipsPlacement(shipsArr){
        const shortedShipsArr = shipsArr.sort((a, b) =>a - b);
        for(let i = 0; i < shortedShipsArr.length-1;i++){
            if(!this.boardPositionArray.includes(shortedShipsArr[i])) return false;
            if(!((shortedShipsArr[i+1] - shortedShipsArr[i]) === 1 
            || (shortedShipsArr[i+1] - shortedShipsArr[i]) === 10)) return false;
        }
        this.hasShipArray.push(...shortedShipsArr);
    }
}

export default GameBoard