let container=document.querySelector(".container");
let game=document.querySelector(".game");
let box=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newgame=document.querySelector("#newgame-btn");
let hide=document.querySelector(".hide");
let messagecontainer=document.querySelector(".message-container"); 
let msg =document.querySelector("#msg");

let turno=true;

const winpatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
let movecount=0;
box.forEach((boxs)=>{
    boxs.addEventListener("click",()=>{
        console.log("boxes  click");
        if(turno){
            boxs.innerText="O";
            turno=false;
        }
        else{
            boxs.innerText="X";
            turno=true;
        }
        boxs.disabled=true;
        movecount++;
        checkwinner();
    });

});

const showwinner=(winner)=>{
    msg.innerText=`congratulations, winner is ${winner}`;
    messagecontainer.classList.remove("hide");
    disablebtn();

}

const disablebtn =()=>{
    for(let boxs of box){
        boxs.disabled=true;
    }
}



const checkwinner=()=>{
    //let winnerfound=false;
    for(let pattern of winpatterns){
        // console.log(pattern);
        let posval1= box[pattern[0]].innerText;
        let posval2= box[pattern[1]].innerText;
        let posval3= box[pattern[2]].innerText;
        //console.log(pattern[0],pattern[1],pattern[2]);
        if(posval1 !="" && posval2 !="" && posval3 !=""){
            if(posval1 === posval2 && posval2 === posval3){
                console.log("winner",posval1);
                showwinner(posval1);
                return;
                //winnerfound=true;
                //break;
            }
        }}
        if(movecount === 9){
            msg.innerText="DRAW";
            messagecontainer.classList.remove("hide");
            disablebtn();
        }

        
    


};

const enablebtn =()=>{
    for(let boxs of box){
        boxs.disabled=false;
        boxs.innerText="";
    }
}


const resetgame=()=>{
    turno=true;
    movecount=0;
    enablebtn();
    messagecontainer.classList.add("hide");
}
newgame.addEventListener("click",resetgame);
reset.addEventListener("click",resetgame);