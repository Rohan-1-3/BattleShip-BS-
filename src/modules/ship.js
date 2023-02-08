export default class Ships{
    constructor(name,length, count ,position, hits = 0){
        this.name = name;
        this.length = length;
        this.position = position;
        this.count = count;
        this.hits = hits;
        this.hasSunken = false;
    }

    hit(position){
        this.position.splice(this.position.indexOf(position),1);
        this.hits++;
        this.isSunk(this.hits);
    }

    isSunk(){
        if(this.position.length === 0) {
            this.hasSunken = true;
            this.count--;
        };
    }
}