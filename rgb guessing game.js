let title = document.getElementById("title");
let rgbValue = document.getElementById("rgb-value");
let newColourbtn = document.querySelectorAll(".difficulty-box")[0];
let easybtn = document.querySelectorAll(".difficulty-box")[1];
let hardbtn = document.querySelectorAll(".difficulty-box")[2];
let colorBlocks = document.querySelector("#coloured-box");

let difficulty;
let rightRgb;
let theRightBlockIndex;
let loopEnder;
let guessesLeft;
let finished;

init();

function init(){
    difficulty = 0;
    let generateBlocks = () => {
        loopEnder = difficulty === 0 ? colorBlocks.children.length / 2:colorBlocks.children.length;
        guessesLeft = loopEnder - 1;
        rightRgb = randomRgb();
        rgbValue.innerHTML = `rgb(${rightRgb[0]},${rightRgb[1]},${rightRgb[2]})`;
        theRightBlockIndex = Math.floor(Math.random() * (loopEnder));
        finished = false;
        for(let i = 0; i < loopEnder; i++){
            if(i === theRightBlockIndex){
                colorBlocks.children[i].style.background = `rgb(${rightRgb[0]},${rightRgb[1]},${rightRgb[2]})`;
                colorBlocks.children[i].style.visibility = "visible";
            }
            else{
                let wrongRgb = randomRgb();
                colorBlocks.children[i].style.background = `rgb(${wrongRgb[0]},${wrongRgb[1]},${wrongRgb[2]})`;
                colorBlocks.children[i].style.visibility = "visible";
            }
        }
        
    };

    for(let i = 3; i < colorBlocks.children.length;i++){
        colorBlocks.children[i].style.visibility = "hidden";
    }

    generateBlocks();
    easybtn.addEventListener("click",() =>{
        if(difficulty !== 0){
            for(let i = 3; i < colorBlocks.children.length;i++){
                colorBlocks.children[i].style.visibility = "hidden";
            }
        }
        difficulty = 0;
        generateBlocks();
        easybtn.setAttribute("id","selected");
        hardbtn.removeAttribute("id");
    });
    hardbtn.addEventListener("click",() => {
        if(difficulty !== 1){
            for(let i = 3; i < colorBlocks.children.length;i++){
                colorBlocks.children[i].style.visibility = "visible";
                console.log("hi");
            }
        }
        difficulty = 1;
        generateBlocks();
        hardbtn.setAttribute("id","selected");
        easybtn.removeAttribute("id");
    });

    newColourbtn.addEventListener("click", () => {
        generateBlocks();
    });

    colorBlocks.addEventListener("click",(e) => {
        if(finished !== true){
            guessesLeft--;
            if(guessesLeft === 0){
                rgbValue.innerHTML = "YOU DID NOT GUESS THE COLOUR";
                finished = true;
            }
            if(e.target.style.background === `rgb(${rightRgb[0]}, ${rightRgb[1]}, ${rightRgb[2]})`){
                for(let i = 0; i < loopEnder; i++){
                    if(theRightBlockIndex === i){
                        continue;
                    }
                    colorBlocks.children[i].style.visibility = "hidden";
                }
                rgbValue.innerHTML = "YOU GUESSED THE RIGHT COLOUR";
                finished = true;
            }
            else{
                e.target.style.visibility = "hidden";
                
            }
        }
        
    });
}

function randomRgb(){
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);

    let rgb = [red,green,blue];
    return rgb;
}