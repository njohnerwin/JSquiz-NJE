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
var initialInput = document.querySelector("#initials");
var scoreDisplay = document.getElementById("scoreDisplay");


//***New variable declarations and initial page display settings***

var timer = 200;
var timerInterval;
var questionNo = 1;
var verifier = document.createElement("h3");
var listHS = JSON.parse(localStorage.getItem("HSlist")) || [];

verifier.textContent = "placeholder";
verifier.setAttribute("style", "visibility: hidden");
verifier.setAttribute("class", "correct");
verifierDiv.appendChild(verifier);

timerEl.textContent = "Time: " + timer;


//***The Questions! (Currently contains 7 + one dummied test question) ***

var questionTest = {
    id: 0,
    question: "This question is a placeholder, we're only using it for testing. Which type of bird is worth the most?",
    answer0: "Two in the bush",
    answer1: "One in the hand",
    answer2: "Three in Brazil somewhere",
    answer3: "Four in a documentary you saw the other day",
    correct: 1 
};

var questionA = {
    id: 1,
    question: "Which of the following will display a dialog box to the user?",
    answer0: "alert()",
    answer1: "parseInt()",
    answer2: "//alert",
    answer3: "origami()",
    correct: 0 
};

var questionB = {
    id: 2,
    question: "What does console.log(variable) do?",
    answer0: "Displays a dialogue box with that value",
    answer1: "Sets the variable's value to log",
    answer2: "Prints the variable's value to the console",
    answer3: "Creates a robust game console emulator",
    correct: 2
};

var questionC = {
    id: 3,
    question: "var pizzaCount = 15; var pizzaP = Math.pow(pizzaCount, 2) ...What is the value of pizzaP?",
    answer0: "30",
    answer1: "0",
    answer2: "225",
    answer3: "It's random",
    correct: 2 
};

var questionD = {
    id: 4,
    question: "var monopoly = Math.floor(Math.random() * 10); ...What is the value of monopoly?",
    answer0: "A random float",
    answer1: "A random integer between 0 and 9",
    answer2: "A random integer between 1 and 10",
    answer3: "Nat. 20!!!",
    correct: 1
};

var questionE = {
    id: 5,
    question: "What prompts does the user normally receive for a prompt() dialogue in Google Chrome?",
    answer0: "OK / Cancel",
    answer1: "Yes / No",
    answer2: "Accept / Decline",
    answer3: "Left / Right",
    correct: 0
};

var questionF = {
    id: 6,
    question: "Which type of bracket is used to denote an array in Javascript?",
    answer0: "Parentheses - ()",
    answer1: "Square brackets - []",
    answer2: "Curly brackets - {}",
    answer3: "Fantasy football brackets",
    correct: 1 
};

var questionG = {
    id: 7,
    question: "If I want to call the second item in array dinosaurNames, I would use...",
    answer0: "dinosaurNames[1]",
    answer1: "dinosaurNames[2]",
    answer2: "dinosaurNames[3]",
    answer3: "dinosaurNames[0]",
    correct: 0
};

var questionsArray = [questionA, questionB, questionC, questionD, questionE, questionF, questionG];


//***Functions***

//Hides multiple elements at once
function hideElements(elementArray) {
    for (var x in elementArray) {
        elementArray[x].setAttribute("style", "visibility:hidden");
    };  
}

//Inverse of hideElements
function showElements(elementArray) {
    for (var x in elementArray) {
        elementArray[x].setAttribute("style", "visibility: visible");
    }
}

//Shuffles an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
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
    hideElements([buttonA, buttonB, buttonC, buttonD, divA, divB, divC, divD]);
}

//Prints the selected question
function printQuestion(number) {

    homeTitleEl.textContent = "Question #" + questionNo;
    homeText.textContent = questionsArray[number].question;
    startButton.setAttribute("style", "display: none");
    showElements([buttonA, buttonB, buttonC, buttonD]);

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
        printScores();
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


//Prints the High Score list
function printScores() {

    clearAll();
    clearInterval(timerInterval);
    listHS = JSON.parse(localStorage.getItem("HSlist")) || [];
    homeTitleEl.textContent = "~HIGH SCORES~";
    homeText.textContent = "";
    startButton.setAttribute("style", "display: none");

    console.log(listHS);

    for (var x in listHS) {
        homeText.appendChild(document.createTextNode(listHS[x].initials + " ~ " + listHS[x].score + " pts."));
        homeText.appendChild(document.createElement("hr"));
    }
    return;

}


//Checks if the user's answer was correct or incorrect
function verifyAnswer(answer) {
    
    if (answer == questionsArray[(parseInt(questionNo)) - 1].correct) {
    
        if (questionNo >= questionsArray.length) {
    
            console.log("Correct!");
            console.log("Finished!");
            feedbackPrompt("correct");
            printVictory();
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


//***Script Execution***

startButton.addEventListener("click", function() {
    shuffle(questionsArray);
    setTimer();
    printQuestion((parseInt(questionNo)) - 1);
});

aButton.addEventListener("click", function() {
    verifyAnswer(0);
});

bButton.addEventListener("click", function() {
    verifyAnswer(1);
});

cButton.addEventListener("click", function() {
    verifyAnswer(2);
});

dButton.addEventListener("click", function() {
    verifyAnswer(3);
});

highScoresNav.addEventListener("click", printScores);

initialForm.addEventListener("submit", function(event) {

    event.preventDefault();

    scoreDisplay.setAttribute("style", "display: none");
    initialForm.setAttribute("style", "display: none");   
    
    var listHS = JSON.parse(localStorage.getItem("HSlist")) || [];

    var entryHS = {
        initials: initialInput.value,
        score: timer,
    };

    listHS.push(entryHS);

    console.log(listHS);

    localStorage.setItem("HSlist", JSON.stringify(listHS));

    printScores();

});