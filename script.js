const setMessage = (element, message) => {
  document.querySelector(element).textContent = message;
};

//State variables
let num = Math.trunc(Math.random() * 20) + 1;
let gameState = true;
let score = 20;
let highScore = 0;
setMessage(".cur-score", "Score: " + score);

//Take a guess
document.querySelector("#checkPress").addEventListener("click", function () {
  if (gameState) {
    const guess = Number(document.querySelector("#guess").value);
    if (score > 1) {
      //Invalid guess
      if (!guess) setMessage(".prompt-message", "Enter a valid number!");
      //Correct guess: GAME WON
      else if (guess === num) {
        setMessage(".prompt-message", "You won the game!");
        setMessage(".num", num);
        gameState = false;
        //Set highscore
        if (score > highScore) highScore = score;
        setMessage(".high-score", "High Score: " + highScore);
        //Incorrect guess: SCORE DEDUCTION
      } else if (guess !== num) {
        setMessage(".prompt-message", guess > num ? "Go lower!" : "Go Higher!");
        setMessage(".cur-score", "Score: " + --score);
      }

      //GAME LOST
    } else {
      gameState = false;
      setMessage(
        ".prompt-message",
        "You lost the game! The answer was: " + num
      );
      setMessage(".cur-score", "Score: 0");
      score = 0;
    }

    //Retry despite loss
  } else {
    setMessage(".prompt-message", "Press play again to try again");
    document.querySelector("#checkPress").disabled = true;
    document.querySelector("#guess").disabled = true;
  }
});

//Play again
document.querySelector("#repeatPress").addEventListener("click", function () {
  num = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  gameState = true;
  setMessage(".cur-score", "Score: " + score);
  setMessage(".num", "?");
  setMessage(".prompt-message", "Take a guess");
  if (document.querySelector("#guess").disabled)
    document.querySelector("#guess").disabled = false;
  if (document.querySelector("#checkPress").disabled)
    document.querySelector("#checkPress").disabled = false;
  document.querySelector("#guess").value = " ";
});
