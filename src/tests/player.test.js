import Player from "../modules/player";
import Ships from "../modules/ship";

describe("player.js", ()=>{
    let player;
    let computer;
    let carrierPlayer;
    let destroyerPlayer;
    let carrierComp;
    beforeEach(()=>{
        player = new Player("player");
        computer = new Player("computer");
        carrierPlayer = new Ships("carrier", 5,[0,1,2,3,4]);
        player.ships.push(carrierPlayer)
        destroyerPlayer = new Ships("destroyer", 3, [4,5,6]);
        player.ships.push(destroyerPlayer)

        carrierComp = new Ships("destroyer", 3, [4,5]);
    })
    test("no overlaps", ()=>{
        player.board.shipsPlacement(carrierPlayer.position);
        expect(player.board.shipsPlacement(destroyerPlayer.position)).toStrictEqual(false);
    });
    test("computer board placement", ()=>{
        expect(computer.board.shipsPlacement(carrierComp.position)).toStrictEqual(true);
    });

    test("attack on computer", ()=>{
        player.board.shipsPlacement(carrierPlayer.position);
        computer.board.shipsPlacement(carrierComp.position)
        if(computer.board.receiveAttack(4)){
            carrierComp.hit(4)
        }
        if(computer.board.receiveAttack(5)){
            carrierComp.hit(5)
        }
        expect(carrierComp.hasSunken).toStrictEqual(true);
    });

    test("game end test", ()=>{
        player.board.shipsPlacement(carrierPlayer.position);
        computer.board.shipsPlacement(carrierComp.position)
        if(computer.board.receiveAttack(4)){
            carrierComp.hit(4)
        }
        if(computer.board.receiveAttack(5)){
            carrierComp.hit(5)
        }
        expect(computer.board.gameEnd()).toStrictEqual(true);
    });

    test("random computer moves", ()=>{
        player.board.shipsPlacement(carrierPlayer.position);
        computer.board.shipsPlacement(carrierComp.position);
        let i = 100;
        const randomNumber = player.board.boardPositionArray[Math.floor(Math.random() * i)];
        i--;
        if(player.board.receiveAttack(randomNumber)){
            carrierPlayer.hit(randomNumber);
        }
        expect(player.board.boardPositionArray.includes(randomNumber)).toBe(false)
    })

    test("computer can't hit same position twice", ()=>{
        player.board.shipsPlacement(carrierPlayer.position);
        computer.board.shipsPlacement(carrierComp.position);
        let i = 100;
        const randomNumber = player.board.boardPositionArray[Math.floor(Math.random() * i)];
        i--;
        if(player.board.receiveAttack(randomNumber)){
            carrierPlayer.hit(randomNumber);
        }
        expect(player.board.receiveAttack(randomNumber)).toBe("out of the box")
    })

    test("name of player", ()=>{
        expect(player.name).toBe("player");
    });

    test("ships number", ()=>{
        expect(player.ships.length).toBe(2);
    });
})