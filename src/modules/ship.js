export default class Ships{
    constructor(name,length, count, hits = 0){
        this.name = name;
        this.length = length;
        this.count = count;
        this.hits = hits;
        this.hasSunken = false;
    }

    hit(){
        this.hits++;
        this.isSunk(this.hits);
    }

    isSunk(){
        if(this.hits === this.length) {
            this.hasSunken = true;
            this.count--;
        };
    }
}