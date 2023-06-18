const prompt = require('prompt-sync')();
let Jackpot = false;
let consecutiveCount = 1;
let win = false;
let bet = 0;
let balance = 0;
let totalWin = 0;
winPerRotation = 0;

let transformedArray1 = [];
let transformedArray2 = [];
let transformedArray3 = [];

const reelsCount = 5;
const rowsCount = 3;
const lines = [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2],
    [0, 1, 0, 1, 0],
    [1, 2, 1, 2, 1],
  ];
const reels = [
    [
      1, 1, 2, 2, 9, 9, 3, 3, 1, 1, 8, 8, 8, 3, 3, 6, 6, 1, 1, 7, 7, 2, 2, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4, 4, 1, 1,
      4, 4, 2, 2, 3, 3, 4, 4, 9, 9, 3, 3, 2, 2, 1, 1, 9, 9, 1, 1, 4, 4, 8, 8, 2, 2, 5, 5, 5, 3, 3, 1, 1, 7, 7, 3, 3, 6,
      6, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 7, 7, 5, 5, 5, 1, 1, 6, 6, 4, 4, 3, 3, 4, 4, 5, 5, 3, 3, 2, 2, 1, 1, 1,
      1, 2, 2, 9, 9, 3, 3, 1, 1, 8, 8, 8, 3, 3, 6, 6, 1, 1, 7, 7, 2, 2, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4, 4, 1, 1, 4,
      4, 2, 2,
    ],
    [
      1, 1, 5, 5, 3, 3, 1, 1, 7, 7, 7, 4, 4, 9, 9, 5, 5, 1, 1, 4, 4, 9, 9, 3, 3, 6, 6, 7, 7, 2, 2, 6, 6, 6, 2, 2, 2, 3,
      3, 4, 4, 8, 8, 8, 3, 3, 2, 2, 1, 1, 4, 4, 1, 1, 8, 8, 2, 2, 5, 5, 1, 1, 5, 5, 9, 9, 3, 3, 1, 1, 7, 7, 4, 4, 5, 5,
      1, 1, 4, 4, 4, 4, 3, 3, 6, 6, 7, 7, 2, 2, 6, 6, 2, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 8, 8, 2, 2, 5, 5, 6,
      6, 2, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 8, 8, 2, 2, 5, 5,
    ],
    [
      1, 1, 9, 9, 2, 2, 2, 5, 5, 8, 8, 3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4,
      4, 5, 5, 1, 1, 4, 4, 3, 3, 4, 4, 3, 3, 2, 2, 9, 9, 1, 1, 1, 1, 2, 2, 2, 5, 5, 3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 7, 7,
      2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 7, 7, 4, 4, 5, 5, 1, 1, 4, 4, 3, 3, 4, 4, 3, 3, 9, 9, 2, 2, 1, 1, 6, 6, 6,
      1, 1, 8, 8, 2, 2, 5, 5, 7, 7, 4, 4, 5, 5, 1, 1, 4, 4, 3, 3, 4, 4, 3, 3, 9, 9, 2, 2, 1, 1,
    ],
    [
      1, 1, 8, 8, 8, 2, 2, 4, 4, 3, 3, 9, 9, 9, 2, 2, 2, 5, 5, 7, 7, 2, 2, 5, 5, 3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 6, 1, 1,
      4, 4, 4, 5, 5, 5, 1, 1, 4, 4, 8, 8, 3, 3, 6, 6, 2, 2, 1, 1, 9, 9, 1, 1, 8, 8, 2, 2, 4, 4, 3, 3, 2, 2, 2, 5, 5, 5,
      7, 7, 2, 2, 9, 9, 3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 1, 1, 7, 7, 5, 5, 1, 1, 4, 4, 3, 3, 8, 8, 6, 6, 2, 2, 1, 1, 9, 9,
      3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 1, 1, 7, 7, 5, 5, 1, 1, 4, 4, 3, 3, 8, 8, 6, 6, 2, 2, 1, 1,
    ],
    [
      1, 1, 5, 5, 7, 7, 3, 3, 9, 9, 9, 1, 1, 3, 3, 2, 2, 2, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 4, 4, 3, 3, 4, 4, 4,
      5, 5, 1, 1, 6, 6, 4, 4, 8, 8, 3, 3, 6, 6, 2, 2, 1, 1, 8, 8, 1, 1, 5, 5, 3, 3, 9, 9, 1, 1, 7, 7, 3, 3, 2, 2, 2, 5,
      5, 1, 1, 7, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 8, 2, 2, 4, 4, 3, 3, 5, 5, 1, 1, 4, 4, 3, 3, 9, 9, 9, 6, 6, 2, 2, 1,
      1, 2, 2, 6, 6, 6, 1, 1, 8, 8, 8, 2, 2, 4, 4, 3, 3, 5, 5, 1, 1, 4, 4, 3, 3, 9, 9, 9, 6, 6, 2, 2, 1, 1,
    ],
  ];
const symbols = {
    1: [0, 0, 10, 20, 50],
    2: [0, 0, 20, 40, 100],
    3: [0, 0, 30, 60, 150],
    4: [0, 0, 40, 80, 200],
    5: [0, 0, 50, 100, 250],
    6: [0, 0, 100, 200, 500],
    7: [0, 0, 150, 300, 800],
    8: [0, 0, 200, 400, 1000],
    9: [0, 0, 300, 600, 2000],
  };

balance = prompt("Make deposit: ");
function spin() {
    transformedArray1 = []
    transformedArray2 = []
    transformedArray3 = []
    let rotations = 0
    let result = [];
    win = false;
    
    console.log(`Your balance is ${balance}`)
    bet = prompt("Your bet: ");
    rotations = prompt("Rotation:")
   
    if ( rotations === 1){
        for( let i = 0; i < rotations; i++){
            for (let i = 0; i < reelsCount; i++){
                const reelSymbols = reels[i];
                const randomIndex = Math.random() * reelSymbols.length;
                const symbol =  reelSymbols.slice(randomIndex, randomIndex + 3);
                result.push(symbol);
            }
    
        transformedArray1 = result.map(subArray => subArray.slice(0, 1)).flatMap(subArray => subArray);
        transformedArray2 = result.map(subArray => subArray.slice(1, 2)).flatMap(subArray => subArray);
        transformedArray3 = result.map(subArray => subArray.slice(2, 3)).flatMap(subArray => subArray);
       
        console.log(transformedArray1);
        console.log(transformedArray2);
        console.log(transformedArray3);
        console.log('\n')
        
        for (let i = 0; i < 5; i++) {
            const singleLine = lines[i];
            if (JSON.stringify(singleLine) === JSON.stringify(transformedArray1)){
                Jackpot = true;
                win = true;  
                console.log(`Jackpot !!! Winning lane: [${singleLine}]`)}
            else if (JSON.stringify(singleLine) === JSON.stringify(transformedArray2)){
                Jackpot = true;
                win = true;  
                console.log(`Jackpot !!! Winning lane: [${singleLine}]`)}
            else if (JSON.stringify(singleLine) === JSON.stringify(transformedArray3)){
                Jackpot = true;
                win = true;  
                console.log(`Jackpot !!! Winning lane: [${singleLine}]`)}
        } 
    
        findConsecutiveSameNumbers(transformedArray1, 1)
        findConsecutiveSameNumbers(transformedArray2, 2)
        findConsecutiveSameNumbers(transformedArray3, 3)

                if (win === false ){
                    console.log("You lose, Try Again");
                    balance = balance - bet}
            }

        } else{
            totalWin = 0
            winPerRotation = 0
            
            for( let i = 0; i < rotations; i++){
                result = []

                for (let i = 0; i < reelsCount; i++) {
                    const reelSymbols = reels[i];
                    const randomIndex = Math.random() * reelSymbols.length;
                    const symbol =  reelSymbols.slice(randomIndex, randomIndex + 3);
                    result.push(symbol);
                  }
        
                transformedArray1 = result.map(subArray => subArray.slice(0, 1)).flatMap(subArray => subArray);
                transformedArray2 = result.map(subArray => subArray.slice(1, 2)).flatMap(subArray => subArray);
                transformedArray3 = result.map(subArray => subArray.slice(2, 3)).flatMap(subArray => subArray);

                console.log(`Spin №: ${i+1}`);
                console.log(transformedArray1);
                console.log(transformedArray2);
                console.log(transformedArray3);
                console.log('\n')
     
                for (let i = 0; i < 5; i++) {
                    const singleLine = lines[i];
                    if (JSON.stringify(singleLine) === JSON.stringify(transformedArray1)){
                        Jackpot = true;
                        win = true;  
                        console.log(`Jackpot !!! Winning lane: [${singleLine}]`)}
                    else if (JSON.stringify(singleLine) === JSON.stringify(transformedArray2)){
                        Jackpot = true;
                        win = true;  
                        console.log(`Jackpot !!! Winning lane: [${singleLine}]`)}
                    else if (JSON.stringify(singleLine) === JSON.stringify(transformedArray3)){
                        Jackpot = true;
                        win = true;  
                        console.log(`Jackpot !!! Winning lane: [${singleLine}]`)}
                } 
     
                findConsecutiveSameNumbers(transformedArray1, 1)
                findConsecutiveSameNumbers(transformedArray2, 2)
                findConsecutiveSameNumbers(transformedArray3, 3)
                balance = balance - bet  
            } 

            if (totalWin != 0){
                console.log(`Total win: ${totalWin}`);
            }

            if (win === false ){
                console.log("You lose, Try Again");
            }
        }
  };
  
  
function findConsecutiveSameNumbers(arr , line) {
    let result = []

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i + 1]) {
        consecutiveCount++;  
    } else {
      if (consecutiveCount >= 3 && consecutiveCount <= 5) { 
        
        result.push({ number: arr[i], count: consecutiveCount });
        win = true
        console.log(`Congratz! In line ${line}, Number ${result[0].number} repeats ${result[0].count} times consecutively!`);
        console.log(`Winning line [${arr}], you win ${bet * symbols[result[0].number][result[0].count-1]} from this lane!`)
        balance = balance + (bet * symbols[result[0].number][result[0].count-1])
        winPerRotation = winPerRotation + (bet * symbols[result[0].number][result[0].count-1])
        totalWin = winPerRotation
            }
        consecutiveCount = 1;
        }
    }
}


while (true) {
    if (balance != 0) {
        spin()
    } else {
        balance = prompt("Make deposit: ");
    }
  }
