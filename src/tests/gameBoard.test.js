/* eslint-disable no-undef */
import GameBoard from "../modules/gameBoard";

describe("gameBoard.js", ()=>{
    let board;
    beforeEach(()=>{
        board = new GameBoard();
    })
    test("checking initialise position", ()=>{
        const arr = [];
        for(let i = 0;i < 100; i++){
            arr.push(i);
        }
        expect(board.boardPositionArray).toStrictEqual(arr);
    });
    test("receives attack and keeps track", ()=>{
        board.receiveAttack(12);
        expect(board.boardPositionArray.includes(12)).toBe(false);
    });
    test("cannot attack same spot twice", ()=>{
        board.receiveAttack(12);
        expect(board.receiveAttack(12)).toBe("out of the box");
    });
    test("checking if a ship has been hit", ()=>{
        board.hasShipArray.push(12);
        expect(board.receiveAttack(12)).toBe(true);
    });
    test("checking if a ship has been miss", ()=>{
        board.hasShipArray.push(13);
        expect(board.receiveAttack(12)).toBe(false);
    });
    test("checking if all ships sunk", ()=>{
        board.hasShipArray.push(12,13,14,15,16);
        board.receiveAttack(12);
        expect(board.gameEnd()).toBe(false);
    });
    test("checking if all ships sunk", ()=>{
        board.hasShipArray.push(12,13);
        board.receiveAttack(12);  
        board.receiveAttack(13); 
        expect(board.gameEnd()).toBe(true);
    });

    test("placing ship horizontol", ()=>{
        board.shipsPlacement([1,2,3,4,5]);
        expect(board.hasShipArray).toStrictEqual([1,2,3,4,5])
    });
    test("placing ship vertical", ()=>{
        board.shipsPlacement([0,10,20]);
        expect(board.hasShipArray).toStrictEqual([0,10,20])
    });
    test("placing ship horizontol", ()=>{
        board.shipsPlacement([1,2,3,4,6]);
        expect(board.hasShipArray).toStrictEqual([])
    });
    test("placing ship vertical and sinking it", ()=>{
        board.shipsPlacement([0,10,20]);
        board.receiveAttack(0);
        board.receiveAttack(20);
        board.receiveAttack(10);
        expect(board.gameEnd()).toStrictEqual(true)
    });

    test("cheking ship horizontol border", ()=>{
        board.shipsPlacement([18,19,20]);
        expect(board.hasShipArray).toStrictEqual([])
    });

    test("cheking ship horizontol border", ()=>{
        board.shipsPlacement([76,77,78,79]);
        expect(board.hasShipArray).toStrictEqual([76,77,78,79])
    });

    test("cheking ship vertical border", ()=>{
        board.shipsPlacement([85,95,105]);
        expect(board.hasShipArray).toStrictEqual([])
    });

    test("cheking ship vertical border", ()=>{
        board.shipsPlacement([95,85,75,65]);
        expect(board.hasShipArray).toStrictEqual([65,75,85,95])
    });

    test("no overlapping ships", ()=>{
        board.shipsPlacement([12,13]);
        board.shipsPlacement([12,13,14])
        expect(board.hasShipArray).toStrictEqual([12,13]);
    });
    test("no overlapping ships", ()=>{
        board.shipsPlacement([94,95,95]);
        expect(board.shipsPlacement([93,94])).toStrictEqual(false);
    });
});