document.querySelector('.js-rock-button')
  .addEventListener('click', ()=>{
    pickComputerMove('rock'); // Call the function with 'rock' as the argument
  })// Add event listener to rock button


  document.querySelector('.js-paper-button')
  .addEventListener('click', ()=>{
    pickComputerMove('paper'); // Call the function with 'rock' as the argument
  })// Add event listener to rock button

let isAutoPlay = false; // Flag to track autoplay status
let intervalId;

function autoPlay(){
  if(!isAutoPlay) { // Check if autoplay is already active
    intervalId =setInterval(function(){
    const randomChoice = randomPickChoice(); // Get a random choice
    pickComputerMove(randomChoice); // Call the function with 'rock' as the argument
    }, 2000);
    isAutoPlay = true; // Set autoplay to true
  }else{
    clearInterval(intervalId); // Clear the interval if autoplay is already active
    isAutoPlay = false; // Set autoplay to false
  }
}

function randomPickChoice(){
  const choices = ['rock', 'paper', 'scissors'];
  const choice = choices[Math.floor(Math.random() * choices.length)]
  return choice;
}



function pickComputerMove(choice){
  const score =JSON.parse(localStorage.getItem('score')) || { // Get score from local storage or initialize it
  wins: 0,
  losses: 0,
  ties: 0
  };

  let computerChoice = Math.random()
  let result;
  if(choice==='rock'){
    if(computerChoice < 0.33) {
      result = 'tie'; 
      score.ties++;
    } else if (computerChoice < 0.66) {
      result = 'lose';
      score.losses++;
    } else {
      result = 'win';
      score.wins++;
    }
  }else if(choice==='paper'){
    if(computerChoice < 0.33) {
      result = 'win';
      score.wins++;
    } else if (computerChoice < 0.66) {
      result  = 'tie';
      score.ties++;
    } else {
      result  = 'lose';
      score.losses++;
    }
  }else if(choice==='scissors'){
    if(computerChoice < 0.33) {
      result  = 'lose';
      score.losses++;
    } else if (computerChoice < 0.66) {
      result  = 'win';
      score.wins++;
    } else {
      result  = 'tie';
      score.ties++;
    }
}


document.querySelector('.js-result').innerText = `You ${result}! \n`;
if(result === 'win'){
  document.querySelector('.js-result').innerText = 'You win! 🎉';
  document.querySelector('.js-result').style.color = 'green'; // Change text color to green
} else if (result === 'lose'){
  document.querySelector('.js-result').innerText = 'You lose! 😢';
  document.querySelector('.js-result').style.color = 'red'; // Change text color to green
} else {
  document.querySelector('.js-result').innerText = 'It\'s a tie! 🤝';
  document.querySelector('.js-result').style.color = 'white'; // Change text color to green
}

const yourChoiceImage = `<img src="images/${choice}-emoji.png" class="move-icon">`;
const computerChoiceImage = `<img src="images/${computerChoice < 0.33 ? 'rock' : computerChoice < 0.66 ? 'paper' : 'scissors'}-emoji.png" class="move-icon">`;
document.querySelector('.js-moves').innerHTML = `You chose ${yourChoiceImage}, computer chose ${computerChoiceImage}. `; 



document.querySelector('.js-score').innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
localStorage.setItem('score',JSON.stringify(score)); // Save score to local storage

}

function ResetScore(){
if(localStorage.getItem('score')){ // Check if score exists in local storage
  localStorage.removeItem('score'); // Remove score from local storage   
} 
console.log('Reset score')
document.querySelector('.js-result').innerText = 'Result:'; // Reset result text
document.querySelector('.js-score').innerText = 'Score:'; // Reset score text 
document.querySelector('.js-moves').innerText = ''; // Reset score text 

document.querySelector('.js-result').style.color = 'white'; // Change text color to green
}