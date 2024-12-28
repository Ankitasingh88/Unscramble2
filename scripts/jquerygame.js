$ ( () => {
    
    $('.overlay').show();
    $('.overlay-text').delay(500).fadeIn(300).delay(300).fadeOut(300);
    $('.overlay-text2').delay(1400).fadeIn(300).delay(300).fadeOut(300);
    $('.overlay-text3').delay(2400).fadeIn(300).delay(300).fadeOut(300);
    $('.overlay').delay(3200).fadeOut(500);

    let words = [
        { word: "addition", hint: "The process of adding numbers" },
        { word: "meeting", hint: "Event in which people come together" },
        { word: "number", hint: "Math symbol used for counting" },
        { word: "exchange", hint: "The act of trading" },
        { word: "group", hint: "A number of objects or persons" },
        { word: "friend", hint: "Person other than a family member" },
        { word: "expert", hint: "Person with extensive knowledge" },
        { word: "library", hint: "Place containing collection of books" },
        { word: "statement", hint: "A declaration of something" },
        { word: "algorithm", hint: "A step-by-step procedure for solving a problem" },
        { word: "debugger", hint: "A tool used to find and fix errors in code" },
        { word: "binary", hint: "The language of computers consisting of 0s and 1s" },
    ];

    var $wordText = $(".word"),
        $instructText = $(".instructions span"),
        $hintText = $(".hint span"),
        $timeText = $(".time span"),
        $hint = $(".hint"),
        $time = $(".time"),
        $inputField = $("input"),
        $refreshBtn = $(".refresh-word"),
        $checkBtn = $(".check-word"),
        $resultText = $(".result");

    let correctWord, timer;

    const initTimer = (maxTime) => {
       clearInterval(timer);
       timer = setInterval(() => {
          if (maxTime > 0) {
              $timeText.text(maxTime);
              maxTime--;              
              if (maxTime == 14) {
                $hint.show();
              }
          }
          else {
            $timeText.text(maxTime);
            $resultText.text('Time off! '+ correctWord.toUpperCase() + ' was the correct word');
            $refreshBtn.text("Play again !!");
            $checkBtn.hide();
          }
        }, 1000);
    };

    const initGame = () => {
      $instructText.hide();
      $checkBtn.show();
      $time.show();
      $inputField.show();
      $hint.hide();
      initTimer(30);
    
      // Get a random word object from the words array
      let randomObj = words[Math.floor(Math.random() * words.length)];
      
      // Shuffle the letters of the word
      let wordArray = randomObj.word.split("");
      for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
      }
      
      $resultText.text("")
      $wordText.text(wordArray.join(""));
      $hintText.text(randomObj.hint);
      $refreshBtn.text("Restart Game");
      $checkBtn.text("Check Word");

      correctWord = randomObj.word.toLowerCase();
      $inputField.val("").attr("maxlength", correctWord.length);
    };
  
    const checkWord = () => {
      let userWord = $inputField.val().toLowerCase();
      if (!userWord) return $resultText.text("Please enter the word to check!");

      if (userWord !== correctWord){
        $inputField.val("").attr("maxlength", correctWord.length);
        return $resultText.text('Wrong !! Try Again ');
      }
        
      $refreshBtn.text("Play again !!");
      $resultText.text('Correct !!' + correctWord.toUpperCase() + ' was the right answer');
      $checkBtn.hide();
      clearInterval(timer);
      $timeText.text("");    
    };
 
    $instructText.text("You will get 30 seconds to guess the scrambled word. \n You will get a hint when 15 seconds remain")
    $refreshBtn.text("Start PLaying !!")
    $refreshBtn.on("click", initGame);
    $checkBtn.hide();
    $hint.hide();
    $time.hide();
    $inputField.hide();
    $checkBtn.on("click", checkWord); 
})