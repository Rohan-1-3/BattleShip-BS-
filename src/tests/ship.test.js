/* eslint-disable no-undef */
import Ships from "../modules/ship"

describe("ship.js", ()=>{
    let carrier;
    let patrolBoat;
    beforeEach(()=>{
        carrier = new Ships("carrier", 5, 1);
        patrolBoat = new Ships("patrolboat", 2, 2)
    })
    test("testing hit function return", ()=>{
        carrier.hit();
        expect(carrier.hits).toBe(1);
    });
    test("testing multiple hit function return", ()=>{
        carrier.hit();
        carrier.hit();
        carrier.hit();
        expect(carrier.hits).toBe(3);
    });
    test("sinking ship", ()=>{
        patrolBoat.hit();
        patrolBoat.hit();
        expect(patrolBoat.hasSunken).toBe(true);
    });
    test("sinking ship reduces count", ()=>{
        patrolBoat.hit();
        patrolBoat.hit();
        expect(patrolBoat.count).toBe(1);
    });
});