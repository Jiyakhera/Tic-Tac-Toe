const youplay = document.querySelector(".youplay");
const popup = document.querySelector(".popup");
const compplay = document.querySelector(".compplay")
const container = document.querySelectorAll(".container");
const boxes = document.querySelector(".boxes");
const reset = document.querySelector("#reset");
const newGame = document.querySelector("#newGame");
const winMsg = document.querySelector(".Msg");
let turnO = true; 
let YouWon = false;
youplay.addEventListener("click", youchose);
function youchose(event){ turnO = true;
    console.log("you chose you play");
    event.preventDefault();
    popup.classList.add("hide");
    boxes.classList.remove("hide");
    reset.classList.remove("hide");
    newGame.classList.remove("hide");
    }
compplay.addEventListener("click", compchose);
function compchose(event){turnO =false;
    console.log("you chose comp play");
    event.preventDefault();
    popup.classList.add("hide");
    boxes.classList.remove("hide");
    reset.classList.remove("hide");
    newGame.classList.remove("hide");
    CompPlay();
    }
function disableBox(){
    for(box of container){
        box.classList.add("disable");
    }
 }
reset.addEventListener("click", resetGame);
function resetGame(){
    boxes.classList.add("hide");
    popup.classList.remove("hide");
    reset.classList.add("hide");
    newGame.classList.add("hide");
    winMsg.classList.add("hide");
    container.forEach((box)=>{
    box.innerText="";
    counting = 0;
    location.reload()
    box.classList.remove("disable");
    })
}
let winningPattern = [
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let counting = 0;
function CompPlay() {
    if(!YouWon){
           let indexx = Math.floor(Math.random()*9);
           if (container[indexx].innerText != "X" && container[indexx].innerText != "O" && counting <=9 ){
               container[indexx].innerText ="X";
               container[indexx].style.color ="#283618";
               turnO = true;
               counting ++;
               checkWinner();
            }
            else if(counting < 9) {
                  CompPlay();
                 }
    }
}
newGame.addEventListener("click",resetGame);
container.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (turnO  && counting <=9 ){
            box.innerText="O";
            checkWinner();
            turnO = false;
            counting++;
            CompPlay();
        }
        if (counting == 9){
            winMsg.classList.remove("hide");
            winMsg.innerText = "It's a Draw :| ";
            container.forEach((box)=>{
            box.classList.add("disable");
            reset.classList.add("hide");
        })
        }})
})
function checkWinner (){
    for (pattern of winningPattern){
        let pos1Val = container[pattern[0]].innerText;
        let pos2Val = container[pattern[1]].innerText;
        let pos3Val = container[pattern[2]].innerText;
      if (pos1Val != "" && pos2Val != "" && pos3Val !=""){
        if (pos1Val === pos2Val && pos2Val === pos3Val){
              if (pos1Val == "X"){
                winMsg.classList.remove("hide");
                winMsg.innerText ="You lost :("
                container.forEach((box)=>{
                box.classList.add("disable");
                reset.classList.add("hide");
                })}
                else {
                    winMsg.classList.remove("hide");
                    winMsg.innerText = "You won :)";
                    YouWon = true;
                    container.forEach((box)=>{
                        box.classList.add("disable");
                        reset.classList.add("hide");
                     })
                } 
            }
        }
}};