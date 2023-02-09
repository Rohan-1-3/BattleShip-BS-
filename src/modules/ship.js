export default class Ships{
    constructor(name,length,position, hits = 0){
        this.name = name;
        this.length = length;
        this.position = position;
        this.hits = hits;
        this.hasSunken = false;
    }

    hit(position){// hits the position and removes the position from the array
        this.position.splice(this.position.indexOf(position),1);
        this.hits++;
        this.isSunk(this.hits);
    }

    isSunk(){// once all hit it sinks
        if(this.position.length === 0) {
            this.hasSunken = true;
        };
    }
}