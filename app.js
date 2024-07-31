const player_choices=document.querySelectorAll(".player-choice");
const enemy_choices=document.querySelectorAll(".enemy-choice");
const outcome_display=document.querySelector(".outcome-display");
let player_choice;


FBInstant.initializeAsync().then(()=>{
    console.log("hello");
    let progress=0;
    setInterval(()=>{
        FBInstant.setLoadingProgress(progress);
        progress+=5;
    },100)
})


class gameCore{
    seconds=15;
    textdisplay=`Starting new round...`;
    constructor(){
        setInterval(()=>{
            if(this.seconds==1){
                this.calculateWinner(this.enemyChoice());
                this.seconds=15;
            }
            if(this.seconds==12){
                randomEnemyGlow(10);
            }
            this.seconds--;
            if(this.seconds>10)  outcome_display.textContent=this.textdisplay;
            else outcome_display.textContent=`${this.seconds} seconds`;
    },1000);
    }
    calculateWinner(enemy_choice){
        
        if(enemy_choice==player_choice){
            this.textdisplay="Its a draw...";
        }
        else if(player_choice+1==enemy_choice||(player_choice==2&&enemy_choice==0)){
            this.textdisplay="Player won!!!";
        }
        else{
            this.textdisplay="Enemy won..."
        }
        if(player_choice==undefined){
            this.textdisplay="You didnt even try..."
        }
    }
    enemyChoice(){
        const randEnemyChoice=Math.floor(Math.random()*3);
        enemyGlow(enemy_choices[randEnemyChoice]);
        enemyChoseAnimation(enemy_choices[randEnemyChoice]);
        return randEnemyChoice;
    }
}

const gc=new gameCore();
player_choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
        const element=e.target;
        const style=element.style;
        player_choices.forEach((other_choices)=>{
            const other_style=other_choices.style;
            if(other_style.animationName=="choose"){
                other_style.animationName="unchoose";
            }            
        })
        style.animationName="choose";
        player_choice=Number(choice.dataset.value);
    })
})
function randomEnemyGlow(durationInSec){
    const randomCall=setInterval(()=>{
        let randNum=Math.floor(Math.random()*3);
        let randEnemyChoice=enemy_choices[randNum];
    
       enemyGlow(randEnemyChoice);
    },1000)
    setTimeout(()=>{
        clearInterval(randomCall);
    },durationInSec*1000)
}

function enemyGlow(enemyChoice){

    enemyChoice.style.animation="none";
    enemyChoice.offsetHeight;
    enemyChoice.style.animation=null;

    enemyChoice.style.animation="enemyGlow 1s";
}
function enemyChoseAnimation(enemyChoice){
    enemyChoice.style.transform="rotate(0deg)";
    enemyChoice.style.animation="enemyChoose 1s";
    setTimeout(()=>{
        enemyChoice.style.transform="rotate(90deg)";
        enemyChoice.style.animation="enemyUnchoose 1s";    
    },2500);
}
