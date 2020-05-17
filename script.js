//***Variables to pull elements from the html***


var highScoresNav = document.getElementById("highScoresNav");
var timerEl = document.getElementById("timerNav");
var container = document.querySelectorAll(".container");
var homeTitleEl = document.getElementById("homeTitle");
var homeText = document.getElementById("homeText");
var startButton = document.getElementById("start");
var buttonA = document.getElementById("aButton");
var divA = document.getElementById("aDiv");
var buttonB = document.getElementById("bButton");
var divB = document.getElementById("bDiv");
var buttonC = document.getElementById("cButton");
var divC = document.getElementById("cDiv");
var buttonD = document.getElementById("dButton");
var divD = document.getElementById("dDiv");
var verifierDiv = document.getElementById("verifierDiv");
var initialForm = document.getElementById("initialForm");
var scoreDisplay = document.getElementById("scoreDisplay");


//***New variable declarations***


var timer = 200;
var timerInterval;
var questionNo = 1;
var verifier = document.createElement("h3");
verifier.textContent = "";
verifier.setAttribute("class", "correct");
verifierDiv.appendChild(verifier);


//***The Questions!***


var questionTest = {
    id: 0,
    question: "This question is a placeholder, we're only using it for testing. Which type of bird is worth the most?",
    answer0: "Two in the bush",
    answer1: "One in the hand",
    answer2: "Three in Brazil somewhere",
    answer3: "Four in a documentary you saw the other day",
    correct: 1 
};

var questionTest2 = {
    id: 1,
    question: "This question is another placeholder, we're testing multiples now!",
    answer0: "Oompa loompa doompity doo",
    answer1: "I've got another puzzle for you",
    answer2: "Oompa loompa doompity dee",
    answer3: "If you are wise, you'll listen to me",
    correct: 3
};

var questionsArray = [questionTest, questionTest2];


//***Functions***


//Shuffles an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}


//Saves the user's score at the end of the game
function saveScore() {
    return;
}


//Prints the High Score list
function printScores() {
    return;
}


//Clears the current multiple choice options so that the new children may populate them properly
function clearQuestion() {
    divA.removeChild(divA.childNodes[3]);
    divB.removeChild(divB.childNodes[3]);
    divC.removeChild(divC.childNodes[3]);
    divD.removeChild(divD.childNodes[3]);
}


//Similar to clearQuestion, but cleans the choice buttons entirely for the victory screen
function clearAll() {
    buttonA.setAttribute("style", "visibility: hidden");
    buttonB.setAttribute("style", "visibility: hidden");
    buttonC.setAttribute("style", "visibility: hidden");
    buttonD.setAttribute("style", "visibility: hidden");
    divA.setAttribute("style", "visibility: hidden");
    divB.setAttribute("style", "visibility: hidden");
    divC.setAttribute("style", "visibility: hidden");
    divD.setAttribute("style", "visibility: hidden");
}

//Prints the selected question
function printQuestion(number) {
    homeTitleEl.textContent = "Question #" + questionNo;
    homeText.textContent = questionsArray[number].question;
    startButton.setAttribute("style", "display: none");
    buttonA.setAttribute("style", "visibility: visible");
    buttonB.setAttribute("style", "visibility: visible");
    buttonC.setAttribute("style", "visibility: visible");
    buttonD.setAttribute("style", "visibility: visible");

    var qtextA = document.createElement("span");
    var qtextB = document.createElement("span");
    var qtextC = document.createElement("span");
    var qtextD = document.createElement("span");

    qtextA.textContent = questionsArray[number].answer0;
    qtextB.textContent = questionsArray[number].answer1;
    qtextC.textContent = questionsArray[number].answer2;
    qtextD.textContent = questionsArray[number].answer3;

    divA.appendChild(qtextA);
    divB.appendChild(qtextB);
    divC.appendChild(qtextC);
    divD.appendChild(qtextD);
}


//Prints the victory screen and prompts the player to enter initials
function printVictory() {

    clearInterval(timerInterval);
    clearAll();

    homeTitleEl.textContent = "Congratulations!";
    homeText.textContent = "You've successfully answered all of the questions!";
    scoreDisplay.textContent = "Score: " + timer;
    scoreDisplay.setAttribute("style", "display: block");
    initialForm.setAttribute("style", "display: block");

}


//Initializes the timer at the start of the game
function setTimer() {
    timerInterval = setInterval(function() {
        timer--;
        timerEl.textContent = "Time: " + timer;

        if (timer <= 0) {
            timerEl.textContent = "Time's up!";
            clearInterval(timerInterval);
        }
    
    }, 1000);
}


//Subtracts time from the timer when the user answers incorrectly
function subtractTimer (amount) {
    timer = timer - amount;
    if (timer <= 0) {
        timerEl.textContent = "Time's up!";
    }
    else {
        timerEl.textContent = "Time: " + timer;
    }
}


//Informs the player whether they were Right or Wrong
function feedbackPrompt(result) {
    verifierDiv.removeChild(verifierDiv.childNodes[0]);
    if (result == "correct") {
        verifier.textContent = "Correct!";
        verifier.setAttribute("class", "correct");
    }
    else {
        verifier.textContent = "Incorrect! (-50 seconds)";
        verifier.setAttribute("class", "incorrect");
    }
    verifierDiv.appendChild(verifier);
}


//Checks if the user's answer was correct or incorrect
function verifyAnswer(answer) {
    
    if (answer == questionsArray[(parseInt(questionNo)) - 1].correct) {
    
        if (questionNo >= questionsArray.length) {
    
            console.log("Correct!");
            console.log("Finished!");
            feedbackPrompt("correct");
            printVictory();
            saveScore();
            return;
    
        }
    
        else {
    
            console.log("Correct!");
            feedbackPrompt("correct");
            questionNo++;
            clearQuestion();
            printQuestion((parseInt(questionNo)) - 1);
            return;
    
        }   
    
    }

    else {
        
        console.log("Incorrect!");
        feedbackPrompt("incorrect");

        if (timer >= 0) {
            subtractTimer(50);
        }

    }
}

//Initializes the game after the Start button is clicked
function startGame() {

    shuffle(questionsArray);
    setTimer();

    printQuestion((parseInt(questionNo)) - 1);
    

}

//***Script Execution***
timerEl.textContent = "Time: " + timer;
startButton.addEventListener("click", startGame);
aButton.addEventListener("click", function() {
    verifyAnswer(0);
})
bButton.addEventListener("click", function() {
    verifyAnswer(1);
})
cButton.addEventListener("click", function() {
    verifyAnswer(2);
})
dButton.addEventListener("click", function(event) {
    verifyAnswer(3);
})