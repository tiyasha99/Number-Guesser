/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Game Values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min,max),
    guessesLeft = 3;

//UI elements

const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector('.message');

//Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

// Listen for guess
guessBtn.addEventListener('click',function(){
 let guess=parseInt(guessInput.value);
  console.log(guess);
 //validate
 if(isNaN(guess) || guess < min || guess > max){
  setMessage(`Please enter a number between ${min} and ${max}`, 'red');
 }
 else{
    
 if(guess === winningNum){
  gameOver(true, `${winningNum} is correct, YOU WIN!`);
 } else {
   guessesLeft -=1;
   if(guessesLeft === 0){
     //Game over- lost
     gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
   } else {
     //Game continues - wrong answer
     setMessage(`${guess} is not correct, ${guessesLeft} guesses left!`, 'red');
     guessInput.style.borderColor = "red";
     guessInput.value = '';
   }
 }
 }

});


//Set  message
function setMessage(msg, color){
  
  message.textContent = msg;
  message.style.backgroundColor = 'white';
  message.style.color = color;
  message.style.textAlign = 'center';
  message.style.borderRadius = "45px";
  message.style.fontFamily = "'Indie Flower', cursive";
  message.style.fontWeight = "900";
}

function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  //Play again
  guessBtn.value = "Play Again";
  guessBtn.className += 'play-again';
}


//Get winning number
function getWinningNum(min,max){
 return Math.floor(Math.random()*(max-min+1)+min);
}