let guessNumber = Math.trunc(Math.random() * 10) + 1;
const userInput = document.querySelector("#guess");
const checkPress = document.querySelector("#checkPress");
const repeatPress = document.querySelector("#repeatPress");
const highScoreContainer = document.querySelector(".score.high-score");
const currentScoreContainer = document.querySelector(".score.cur-score");
const displayNumber = document.querySelector(".num");
const promptMessage = document.querySelector(".prompt-message");
console.log(guessNumber);

let audio = document.querySelector("audio");
audio.volume = 0.5;
currentScoreContainer.textContent = 100;
let attempts = 0;
let matchState = true;
checkPress.addEventListener("click", function () {
  let guess = Number(userInput.value);
  if (guess) {
    if (guess > 10) promptMessage.textContent = "The max guess is 10, for now";
    else {
      attempts++;
      if (matchState) {
        if (guess === guessNumber) {
          promptMessage.textContent = `Congratulations you guessed it in ${attempts} attempts`;
          matchState = false;
          let score = Number(currentScoreContainer.textContent);
          if (score > Number(highScoreContainer.textContent)) {
            highScoreContainer.textContent = score;
          }
          displayNumber.textContent = guessNumber;
        } else {
          scoreCalculator(guess);
        }
      } else {
        promptMessage.textContent = "Press click play again to try again";
      }
    }
  }
});

function scoreCalculator(guess) {
  let score = Number(currentScoreContainer.textContent);
  if (score > 5) {
    let scoreReduction =
      3 * Math.ceil((Math.abs(guessNumber - guess) / 100) * score);
    score -= scoreReduction;
    console.log(scoreReduction);
    currentScoreContainer.textContent = score;
    let highOrlow = guess > guessNumber ? "lower" : "higher";
    Math.abs(guessNumber - guess) > 3
      ? (promptMessage.textContent = `Bad guess, go ${highOrlow}`)
      : (promptMessage.textContent = `Good guess, go ${highOrlow}`);
  } else {
    currentScoreContainer.textContent = 0;
    matchState = false;
    promptMessage.textContent = "Game over, good try~";
  }
}

repeatPress.addEventListener("click", function () {
  promptMessage.textContent = "Take a guess!";
  guessNumber = Math.trunc(Math.random() * 10) + 1;
  currentScoreContainer.textContent = 100;
  displayNumber.textContent = "?";
  matchState = true;
  attempts = 0;
});

/*Score formula:
  Max guess: 10
  Max point reduction = 10%
  Score reduction on wrong guess = (Actual number - Guess)/100 * currentScore;
*/
