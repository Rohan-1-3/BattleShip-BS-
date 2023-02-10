import manualPlacement from "./manualShipsPlacement"

export default function gameStart(){
    const manualButton = document.querySelector(".manual");
    const rotate = document.querySelector(".rotate");
    manualButton.addEventListener("click", ()=>{
        rotate.classList.remove("hide");
        manualPlacement();
    })
}