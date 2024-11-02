const state={
    view:{
        squares:document.querySelectorAll(".square"),
        enemy:document.querySelector(".enemy"),
        timeleft:document.querySelector("#time-left"),
        score:document.querySelector("#score"),
        vida:document.querySelector("#vida")
    },
    values:{
        timerId:null,
        sountDownTimerId:null,
        gameVelocity:1000,
        hitPosition:0,
        result:0,
        currentTime:30,
        vida:5,

    },
};

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a")
    audio.volume=0.2;
    audio.play();

}

function countDown(){
    state.values.currentTime--;
    state.view.timeleft.textContent=state.values.currentTime;
    if(state.values.currentTime<=0){
        state.values.vida--;
        state.view.vida.textContent=state.values.vida;
        state.values.currentTime=60;
       
        clearInterval(state.values.sountDownTimerId);
        clearInterval(state.values.timerId);
        alert("Game Over! O seu resultado foi:"+state.values.result);
        
         
        
    }
}


function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare= state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition=randomSquare.id;

}
function moveEnemy(){
    clearInterval(state.values.timerId);
    state.values.timerId= setInterval(randomSquare,state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown",()=>{
            if(square.id===state.values.hitPosition){
                state.values.result++;
                
                state.view.score.textContent=state.values.result;
                state.values.hitPosition=null;
                playSound();
                if (state.values.result%10=== 0 && state.values.gameVelocity>100){
                    state.values.gameVelocity-=300;
                    moveEnemy();
                }
            }
            else state.values.vida--;
                state.view.vida.textContent=state.values.vida;
                if(state.values.vida<=0){
                    clearInterval(state.values.sountDownTimerId);
                    clearInterval(state.values.timerId);
                    alert("Game Over! O seu resultado foi:"+state.values.result);}
        });
    });
}
function initialize(){
    moveEnemy();
    addListenerHitBox();
    state.values.sountDownTimerId=setInterval(countDown,1000);
}


initialize();
