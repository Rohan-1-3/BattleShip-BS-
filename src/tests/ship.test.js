import Ships from "../modules/ship"

describe("ship.js", ()=>{
    let carrier;
    let patrolBoat;
    beforeEach(()=>{
        carrier = new Ships("carrier", 5, [0,1,2,3,4]);
        patrolBoat = new Ships("patrolboat", 2, [10,11])
    })
    test("testing hit function return", ()=>{
        carrier.hit(0);
        expect(carrier.hits).toBe(1);
    });
    test("testing multiple hit function return", ()=>{
        carrier.hit(1);
        carrier.hit(2);
        carrier.hit(3);
        expect(carrier.hits).toBe(3);
    });
    test("sinking ship", ()=>{
        patrolBoat.hit(10);
        patrolBoat.hit(11);
        expect(patrolBoat.hasSunken).toBe(true);
    });
});