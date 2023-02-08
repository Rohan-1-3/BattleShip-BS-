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

}

export default GameBoard