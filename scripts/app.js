$(document).ready(function () {
  const green = "green",
    red = "red",
    yellow = "yellow",
    blue = "blue";
  let level = 0;
  let sequence = [];
  let step = 0;
  let colors = [red, blue, green, yellow];
  let strict = false;

  // Start Simon
  $("#start").on("click", start);

  // Strict Mode
  $("#strictMode").on("click", function () {
    strictMode();
  });

  function strictMode() {
    $("#strictMode").toggleClass("active");
    strict = !strict;
  }

  // On/Off Mode
  $("#on-off").on("click", function () {
    $(this).toggleClass("simonOn");
    $("#start, .switch, .green, .yellow, .blue, .red").toggleClass("disable");
  });

  // Animate if clicked
  $(".green").on("click", function () {
    $(".green")
      .animate({ opacity: 0.3 }, 200)
      .animate({ opacity: 1 }, 200);
  });

  $(".red").on("click", function () {
    $(".red")
      .animate({ opacity: 0.3 }, 200)
      .animate({ opacity: 1 }, 200);
  });

  $(".yellow").on("click", function () {
    $(".yellow")
      .animate({ opacity: 0.3 }, 200)
      .animate({ opacity: 1 }, 200);
  });

  $(".blue").on("click", function () {
    $(".blue")
      .animate({ opacity: 0.3 }, 300)
      .animate({ opacity: 1 }, 300);
  });

  //Start the game
  function start() {
    step = 0;
    level = 1;
    sequence = [];
    nextSequence();
    $("#levelNum").html(level);
    $("#alerts").html("");
  }

  function nextSequence() {
    var newColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(newColor);
    //console.log("Sequence: " + sequence);
    let gameOn = setTimeout(function () {
      animate(sequence);
      $("#levelNum").html(level);
    }, 800);
  }

  function userSequence(color) {
    if (color === sequence[step]) {
      if (step === sequence.length - 1) {
        //console.log("Sequence complete");
        winner();
        step = 0;
        level++;
        nextSequence();
      } else {
        step++;
      }
    } else {
      if (strict) {
        $("#alerts").html("<h3>Wrong! You lost.</h3>");
        reset();
      } else {
        gameOn = setTimeout(function () {
          $("#alerts").html("Wrong sequence! Try again.");
          tryAgain();
        }, 1800);
      }
    }

    function tryAgain() {
      gameOn = setTimeout(function () {
        $("#alerts").html("");
        animate(sequence);
      }, 1000);
    }

    function winner() {
      if (level === 20 && step === sequence.length - 1) {
        level = 0;
        step = false;

        gameOn = setTimeout(function () {
          $("#alerts").html("You won! Congratulations!");
          sequence = false;
          level = 0;
        }, 800);
      }
    }
  }

  function reset() {
    sequence = [];
    step = 0;
    level = 0;
    strict = false;
    $("#strictMode").removeClass("active");
  }

  function animate(sequence) {
    var i = 0;
    var interval = setInterval(function () {
      flash(sequence[i]);
      playSound(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
      }
    }, 1300);
  }

  function flash(pad) {
    $("." + pad)
      .animate({ opacity: 0.3 }, 600)
      .animate({ opacity: 1 }, 600);
  }

  function playSound(sound) {
    var sound = $("#audio-" + sound)[0];
    sound.currentTime = 0;
    sound.play();
  }

  // User's Answer
  $(".green").click(function () {
    userSequence(green);
  });
  $(".red").click(function () {
    userSequence(red);
  });
  $(".yellow").click(function () {
    userSequence(yellow);
  });
  $(".blue").click(function () {
    userSequence(blue);
  });

  $(".green").click(function () {
    $("#audio-green")[0].play();
  });
  $(".blue").click(function () {
    $("#audio-blue")[0].play();
  });
  $(".yellow").click(function () {
    $("#audio-yellow")[0].play();
  });
  $(".red").click(function () {
    $("#audio-red")[0].play();
  });
});
