const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currenQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
fetch("questions.json").then(res => {
    return res.json();
}).then(loadedQuestions => {
    questions = loadedQuestions;
    startGame();
}).catch(err => {
    
});
const diemMotCau = 10;
const tongSoCauHoi = 3;

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}
function getNewQuestion() {
    if (availableQuestions.lenth === 0 || questionCounter >= tongSoCauHoi) {
        localStorage.setItem("diemKetThuc", score);
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = "question: " + questionCounter + "/" + tongSoCauHoi;
    progressBarFull.style.width = `${(questionCounter / tongSoCauHoi)*100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currenQuestion = availableQuestions[questionIndex];
    question.innerText = currenQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currenQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currenQuestion.answer ? "correct" : "incorrect";

        if(classToApply === 'correct') {
            incrementScore(diemMotCau);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    })
});

function incrementScore(number){
    score += number;
    scoreText.innerText = score;
}

