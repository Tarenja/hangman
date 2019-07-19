$(document).ready(() => {
  const words = ["3dhubs", "marvin", "print", "filament", "order", "layer"];
  // generating alphabet keys from here to make any changes easier than entering HTML elements individually
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const maxMistakes = 5;
  let selected;
  let random;
  let mistakes = 0;
  let score = 6;
  let highscore;

  // generating the alphabet for people to click on and choose letters
  alphabet.forEach(item => {
    $("#alphabet-box ul").append(`<li class="alphabet">${item}</li>`);
  });

  function resetGame() {
    random = Math.floor(Math.random() * words.length);
    selected = words[random];
    score = 6;
    mistakes = 0;

    // adding hearts to represent the maximum amount of mistakes allowed
    for (let i = 0; i < maxMistakes; i++) {
      $("#tries").append("<li>&#9829;</li>");
    }

    // generating 'empty' spots for number of letters in chosen word
    for (let i = 0; i < selected.length; i++) {
      $("#guess-box ul").append(`<li class="letter unknown" id="${i}">_</li>`);
    }

    $("li.alphabet").removeClass("clicked");
    $("#highscore-box button").remove();
  }

  resetGame();

  $("li.alphabet").click(e => {
    const clicked = $(e.target);

    // making sure each letter can only be clicked once to avoid excess processing
    if (!clicked.hasClass("clicked")) {
      clicked.addClass("clicked");
      const content = clicked[0].innerHTML;
      const indexes = [];
      // splitting so I can apply foreach and gather more than 1 index
      selected.split("").forEach((letter, i) => {
        letter === content ? indexes.push(i) : null;
      });

      // this is to keep track how many letters have been guessed correctly by removing the unknown class when guessed
      if (indexes.length > 0) {
        indexes.forEach(i => {
          $("li#" + i)[0].innerHTML = selected[i];
          $("li#" + i).removeClass("unknown");
        });
      } else {
        mistakes++;
        score--;
        $("ul#tries li:first-child").remove();
        if (mistakes > maxMistakes) {
          $("li.alphabet").addClass("clicked");
          $("#highscore-box p").replaceWith(`<p>You made too many mistakes, Game Over!</p>`);
          $("#highscore-box").append('<button id="reset">Try Again?</button>');
          // only resetting highscore if player loses, otherwise it keeps count of it
          highscore = 0;
        }
      }

      // if all letters have been guessed there will be no more li with the class 'unknown'
      if (!$("#guess-box li").hasClass("unknown")) {
        $("li.alphabet").addClass("clicked");
        highscore = score;
        $("#highscore-box p")
          .replaceWith(`<p>You guessed the word! Your current score is ${score}!
          Your highscore is ${highscore}!</p>`);
        $("#highscore-box").append('<button id="reset">Play Again?</button>');
      }
      // player can always keep playing, whether they win or lose
      $("#reset").click(() => {
        $("#highscore-box p").replaceWith(
          `<p>Try to make as few mistakes as possible for a highscore! The highest score is 5.</p>`
        );
        $("#guess-box ul li").remove();
        $("#tries li").remove();
        resetGame();
      });
    }
  });
});
