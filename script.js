let box = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgame = document.querySelector("#newgame-btn");
let messagecontainer = document.querySelector(".message-container"); 
let msg = document.querySelector("#msg");

let friendBtn = document.querySelector("#friend");
let computerBtn = document.querySelector("#computer");
let difficultyBox = document.querySelector("#difficulty-box");
let diffBtns = document.querySelectorAll("#difficulty-box button");

let symbolBox = document.querySelector("#symbol-box");
let symbolBtns = document.querySelectorAll("#symbol-box button");

let player = "O";
let ai = "X";
let count = 0;
let gameOver = false;
let mode = "friend";
let difficulty = "easy";

const winpatterns = [
    [0,1,2],[0,3,6],[0,4,8],
    [1,4,7],[2,5,8],[2,4,6],
    [3,4,5],[6,7,8],
];

// MODE
friendBtn.onclick = () => {
    mode = "friend";
    difficultyBox.classList.add("hide");
    symbolBox.classList.add("hide");
    resetgame();
};

computerBtn.onclick = () => {
    mode = "computer";
    difficultyBox.classList.remove("hide");
    symbolBox.classList.remove("hide");
};

// DIFFICULTY
diffBtns.forEach(btn=>{
    btn.onclick = () => {
        difficulty = btn.dataset.level;
        resetgame();
    };
});

// SYMBOL SELECT
symbolBtns.forEach(btn=>{
    btn.onclick = () => {
        player = btn.dataset.symbol;
        ai = player === "X" ? "O" : "X";
        resetgame();
    };
});

// CLICK
box.forEach((boxs)=>{
    boxs.addEventListener("click",()=>{
        if(boxs.innerText !== "" || gameOver) return;

        boxs.innerText = player;
        boxs.disabled = true;
        count++;

        if(checkwinner()) return;

        if(mode === "computer"){
            setTimeout(aiMove, 200);
        } else {
            togglePlayer();
        }
    });
});

// FRIEND MODE SWITCH
const togglePlayer = () => {
    player = player === "O" ? "X" : "O";
};

// AI MOVE
const aiMove = () => {
    if(gameOver) return;

    if(difficulty === "easy"){
        randomMove();
    } 
    else if(difficulty === "medium"){
        smartMove();
    } 
    else {
        if(!quickMove()){
            strategicMove();
        }
    }

    checkwinner();
};

// EASY
const randomMove = () => {
    let empty = [];
    box.forEach((b,i)=>{
        if(b.innerText==="") empty.push(i);
    });

    let rand = empty[Math.floor(Math.random()*empty.length)];
    makeMove(rand);
};

// MEDIUM
const smartMove = () => {
    if(!quickMove()){
        randomMove();
    }
};

// QUICK WIN/BLOCK
const quickMove = () => {
    // win
    for(let p of winpatterns){
        let [a,b,c]=p;
        let vals=[box[a].innerText,box[b].innerText,box[c].innerText];

        if(vals.filter(v=>v===ai).length===2 && vals.includes("")){
            makeMove(p[vals.indexOf("")]);
            return true;
        }
    }

    // block
    for(let p of winpatterns){
        let [a,b,c]=p;
        let vals=[box[a].innerText,box[b].innerText,box[c].innerText];

        if(vals.filter(v=>v===player).length===2 && vals.includes("")){
            makeMove(p[vals.indexOf("")]);
            return true;
        }
    }

    return false;
};

// HARD (FAST STRATEGY)
const strategicMove = () => {
    if(box[4].innerText === ""){
        makeMove(4);
        return;
    }

    let corners = [0,2,6,8].filter(i => box[i].innerText === "");
    if(corners.length){
        makeMove(corners[Math.floor(Math.random()*corners.length)]);
        return;
    }

    randomMove();
};

// MAKE MOVE
const makeMove = (i) => {
    box[i].innerText = ai;
    box[i].disabled = true;
    count++;
};

// CHECK WIN
const checkwinner = () => {
    for(let p of winpatterns){
        let [a,b,c]=p;
        let v1=box[a].innerText;
        let v2=box[b].innerText;
        let v3=box[c].innerText;

        if(v1!=="" && v1===v2 && v2===v3){
            showwinner(v1);
            return true;
        }
    }

    if(count===9){
        msg.innerText="Draw";
        messagecontainer.classList.remove("hide");
        gameOver=true;
        return true;
    }

    return false;
};

const showwinner = (w)=>{
    msg.innerText=`Winner: ${w}`;
    messagecontainer.classList.remove("hide");
    gameOver=true;
};

// RESET
const resetgame = ()=>{
    count=0;
    gameOver=false;

    box.forEach(b=>{
        b.innerText="";
        b.disabled=false;
    });

    messagecontainer.classList.add("hide");

    // 🔴 AI starts if player is O
    if(mode === "computer" && player === "O"){
        setTimeout(aiMove, 300);
    }
};

newgame.onclick = resetgame;
reset.onclick = resetgame;
