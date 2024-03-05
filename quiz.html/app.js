let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 1;
let countdown;


// Questions and Options array
const quizArray = [{
    id: "0", question: "Which is the most widely spoken language in the world?",
    options: ["Spanish", "Mandarin", "English", "Germen"], correct: "Mandarin"
},
{
    id: "1", question: "Which is the only continent in the world without a desert?",
    options: ["North America", "Asia", "Africa", "Europe"], correct: "Europe"
},
{
    id: "2", question: "Who invented Computer?",
    options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
    correct: "Charles Babbage"
},
{
    id: "3",
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    correct: "Hyper Text Markup Language"
},
{
    id: "4",
    question: "What is the purpose of CSS?",
    options: ["To create interactive web pages", "To define the structure of a web page", "To style the presentation of a web page", "To perform server-side scripting"],
    correct: "To style the presentation of a web page"
},
{
    id: "5",
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "JavaScript", "Java", "C++"],
    correct: "JavaScript"
},
{
    id: "6",
    question: "What is the latest version of the Android operating system?",
    options: ["Android 10", "Android 11", "Android 12", "Android 13"],
    correct: "Android 13"
},
{
    id: "7",
    question: "Who is the co-founder of Microsoft Corporation?",
    options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Elon Musk"],
    correct: "Bill Gates"
},
{
    id: "8",
    question: "What does API stand for?",
    options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Application Process Interface"],
    correct: "Application Programming Interface"
},
{
    id: "9",
    question: "In computer science, what does 'SQL' stand for?",
    options: ["Structured Question Language", "Standard Query Language", "Sequential Query Language", "Structured Query Listing"],
    correct: "Structured Query Language"
},
{
    id: "10",
    question: "Which company developed the Java programming language?",
    options: ["Microsoft", "Google", "Oracle", "IBM"],
    correct: "Oracle"
},
{
    id: "11",
    question: "What is the purpose of a firewall in computer networks?",
    options: ["To protect against viruses", "To filter network traffic", "To enhance internet speed", "To store data securely"],
    correct: "To filter network traffic"
},
{
    id: "12",
    question: "What is the main function of a router in a network?",
    options: ["To connect devices within the same network", "To block malicious websites", "To manage internet speed", "To forward data between computer networks"],
    correct: "To forward data between computer networks"
}
];

// Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    // Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    // display current question card
    quizCards[questionCount].classList.remove("hide");
};

// Quiz Creation 
function quizCreator() {
    // randomly sort option
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      // Custom sorting logic to shuffle the array within the range 0 to 10
      quizArray.sort(() => getRandomInt(0, 10) - 5);
    // generate quiz
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        // Quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        // question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //  question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        // options
        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>`;
        quizContainer.appendChild(div);
    }
}

// restart quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

// Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        // increment questionCount
        questionCount += 1;
        // if last question
        if (questionCount == quizArray.length) {
            // hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            // user score
            userScore.innerHTML =
                "Your score is " + scoreCount + "out of " + questionCount;
        } else {
            // display questionCount
            countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length +
                "Question";
            // display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
)

// initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

// when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
})
// hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");

}


function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    // if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        // for marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        })
    }

    // clear interval(stop timer)
    clearInterval(countdown);
    // disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}