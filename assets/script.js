// variables used in creating the quiz and timer functions
var questionOne = ["A string in Javascript may contain ____.", "Letters", "Numbers", "Symbols", "All of the above", "answer4"];
var questionTwo = ["Javascript is run in the ____.", "Olympics", "Browser", "Desktop", "Spreadsheet", "answer2"];
var questionThree = ["A 'Boolean' variable can have how many possible values?", "One", "Two", "Five", "Infinite", "answer2"];
var questionFour = ["How is a comment written in HTML?", "//", "/* */", "<!-- -->", "<comment>", "answer3"];
var questionFive =  ["Objects in Javascript have ____.", "Volume", "Personalities", "Properties", "Wheels", "answer3"];
var questionBank = [questionOne, questionTwo, questionThree, questionFour, questionFive];
var userScore = 0;
var correctAnswer = "";
var qnumber = 0;
var timeLeft = 60;
var quizInProgress = false;

// HTML selector variables
var timerText = document.getElementById("timer");
var homePage = document.getElementById("welcomeScreen");
var startButton = document.getElementById("start-btn");
var quizHeader = document.getElementById("questionText");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var answerButton = document.querySelectorAll("#quizchoice");

// runs the quiz timer
function startTimer () {
    if (quizInProgress == true) {
        timeLeft--;
        timerText.textContent = "Timer: " + timeLeft;
        if (timeLeft === 0) {
            clearInterval(startTimer);
            stopQuiz();
            quizInProgress = false;
        }
    } else {
        clearInterval(startTimer);
    }
}

    // creates the UI for the next question
function nextQuestion() {
    if (qnumber < 5) {
        var q = questionBank[qnumber];
        var qText = q[0];
        var qFirst = q[1];
        var qSecond = q[2];
        var qThird = q[3];
        var qFourth = q[4];
        correctAnswer = q[5];

        quizHeader.textContent = qText;
        answer1.textContent = qFirst;
        answer2.textContent = qSecond;
        answer3.textContent = qThird;
        answer4.textContent = qFourth;
        qnumber++;
    } else {
        stopQuiz();
        quizInProgress = false;
    }
}

// starts the quiz, triggered by event listen on the start button.
function startQuiz (event) {
    // event.preventDefault();
    qnumber = 0;
    timeLeft = 60;
    quizInProgress = true;
    document.getElementById("feedback").textContent = ""

    nextQuestion();
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("quizScreen").style.display = "block";
    setInterval(startTimer, 1000);
}

// checks if user's answer is correct, then move on to next question
function verifyAnswer (event) {
    event.preventDefault();
    var userAnswer = event.target.getAttribute("id");
    if (userAnswer === correctAnswer) {
        document.getElementById("feedback").textContent = "Correct!"
        if (timeLeft > 1) {
            nextQuestion();
        } else {
            timeLeft = 0;
            stopQuiz();
            quizInProgress = false;
        }
    } else {
        document.getElementById("feedback").textContent = "Wrong!"
        timeLeft -= 15;
        if (timeLeft > 1) {
            nextQuestion();
        } else {
            timeLeft = 0;
            stopQuiz();
        }
    }
}

// records current score and transitions to name input
function stopQuiz (event) {
    userScore = timeLeft;
    document.getElementById("submitHeader").textContent = "Congratulations! Your score is: " + timeLeft + " Enter your name below:"

    // function to store the user's highest score locally
    if (localStorage.getItem("quizHighScore") == null) {
        localStorage.setItem("quizHighScore", userScore);
    } else if (localStorage.getItem("quizHighScore") < userScore) {
        localStorage.setItem("quizHighScore", userScore);
    }

    document.getElementById("quizScreen").style.display = "none";
    document.getElementById("submitScreen").style.display = "block";
}

// combins score and name data to create a high score list entry
function submitScore (event) {
    userName = document.getElementById("name-input").value;

    var listEl = document.createElement("li");
    listEl.textContent = userName + " - " + userScore + " seconds remaining";
    document.getElementById("high-score-list").prepend(listEl);

    document.getElementById("submitScreen").style.display = "none";
    document.getElementById("highScoreScreen").style.display = "block";
    
}

function resetQuiz (event) {
    document.getElementById("highScoreScreen").style.display = "none";
    document.getElementById("welcomeScreen").style.display = "block";
}

function highScoreLink (event) {
    
    quizInProgress = false;
    timerText.textContent = "";
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("quizScreen").style.display = "none";
    document.getElementById("submitScreen").style.display = "none";
    document.getElementById("highScoreScreen").style.display = "block";
}

document.getElementById("start-btn").addEventListener("click",startQuiz);
document.getElementById("button-list").addEventListener("click",verifyAnswer);
document.getElementById("score-submit").addEventListener("click",submitScore);
document.getElementById("reset-button").addEventListener("click",resetQuiz);
document.getElementById("high-score-link").addEventListener("click",highScoreLink);

// document.getElementById("welcomeScreen").style.display = "block";
// document.getElementById("quizScreen").style.display = "block";
// document.getElementById("submitScreen").style.display = "block";
// document.getElementById("highScoreScreen").style.display = "block";




