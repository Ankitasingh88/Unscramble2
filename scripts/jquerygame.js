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
       $hintText = $(".hint span"),
       $timeText = $(".time span"),
       $inputField = $("input"),
       $refreshBtn = $(".refresh-word"),
       $checkBtn = $(".check-word"),
       $resultText = $(".result");

    let correctWord, timer;

    const initTimer = (maxTime) => {
       clearInterval(timer);
       timer = setInterval(() => {
          if (maxTime > 0) {
              maxTime--;
                $timeText.text(maxTime);
        } else {
           // alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
           // let text = "Time off! ${correctWord.toUpperCase()} was the correct word"
           $resultText.text('Time off! '+ correctWord.toUpperCase() + ' was the correct word');
           initGame(); // Assuming initGame is defined elsewhere
        }
    }, 1000);
};

const initGame = () => {
    initTimer(30);
  
    // Get a random word object from the words array
    let randomObj = words[Math.floor(Math.random() * words.length)];
    
    // Shuffle the letters of the word
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    
    $wordText.text(wordArray.join(""));
    $hintText.text(randomObj.hint);

    correctWord = randomObj.word.toLowerCase();
    $inputField.val("").attr("maxlength", correctWord.length);
 };
  
  // Initialize the game
  initGame();

const checkWord = () => {
    let userWord = $inputField.val().toLowerCase();
    if (!userWord) return alert("Please enter the word to check!");
    if (userWord !== correctWord)
      return alert(`Oops! ${userWord} is not a correct word`);
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
 };

 $refreshBtn.on("click", initGame);
 $checkBtn.on("click", checkWord);

})