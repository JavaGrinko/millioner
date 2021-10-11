const levels = [
    { level: 14, sum: 1000000 },
    { level: 13, sum: 500000 },
    { level: 12, sum: 250000 },
    { level: 11, sum: 125000 },
    { level: 10, sum: 64000 },
    { level: 9, sum: 32000 },
    { level: 8, sum: 16000 },
    { level: 7, sum: 8000 },
    { level: 6, sum: 4000 },
    { level: 5, sum: 2000 },
    { level: 4, sum: 1000 },
    { level: 3, sum: 500 },
    { level: 2, sum: 300 },
    { level: 1, sum: 200 },
    { level: 0, sum: 100 },
];

const questions = [{
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 0
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 1
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 2
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 3
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 4
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 5
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 6
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 7
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 8
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 9
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 10
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 11
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 12
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 13
}, {
    question: 'Сколько будет 2+2?',
    answers: ['0', '1', '3', '4'],
    correctAnswerIndex: 3,
    difficalty: 14
}];

let currentLevel = 0;
let currentQuestion;
let shuffleAnswers;
let correctAnswer;

window.onload = () => {
    generateLevels();
    setActiveLevel(currentLevel);
    setActions();
}

function setActions() {
    document.getElementById("question-ans0").onclick = () => choiseAnswer(0);
    document.getElementById("question-ans1").onclick = () => choiseAnswer(1);
    document.getElementById("question-ans2").onclick = () => choiseAnswer(2);
    document.getElementById("question-ans3").onclick = () => choiseAnswer(3);
}

let ticks = 0;
function choiseAnswer(index) {
    let ans = document.getElementById("question-ans"+index);
    let clickedAnswer = shuffleAnswers[index];
    if (clickedAnswer === correctAnswer) {
        let interval = setInterval(() => {
            if (ticks < 10) {
                ans.classList.toggle("answer-correct");
                ticks++;
            } else {
                currentLevel++;
                ticks = 0;
                if (currentLevel === levels.length) {
                    winner();
                } else {
                    setActiveLevel(currentLevel);
                    clearInterval(interval);
                }
            }
        }, 100);
    } else {
        let interval = setInterval(() => {
            if (ticks < 10) {
                ans.classList.toggle("answer-incorrect");
                ticks++;
            } else {
                ticks = 0;
                clearInterval(interval);
                gameOver();
            }
        }, 100);
    }
}

function gameOver() {
    let gg = document.getElementById("game-over-container");
    gg.style["display"] = "flex";
}

function winner() {
    let gg = document.getElementById("winner-container");
    gg.style["display"] = "flex";
}

function setActiveLevel(level) {
    let levelsTable = document.getElementById("levels");
    for (let i = 0; i < levelsTable.rows.length; i++) {
        let tr = levelsTable.rows[i];
        if (i === (levels.length - level - 1)) {
            tr.classList.add("active-level");
        } else {
            tr.classList.remove("active-level");
        }
    }
    setQuestion(level);
}

function setQuestion(level) {
    let potentialQuestions = questions.filter(q => q.difficalty === level);
    let randomIndex = Math.round(Math.random() * (potentialQuestions.length - 1));
    currentQuestion = potentialQuestions[randomIndex];
    correctAnswer = currentQuestion.answers[currentQuestion.correctAnswerIndex];
    shuffleAnswers = currentQuestion.answers.sort( () => .5 - Math.random() );
    document.getElementById("question-text").innerHTML = currentQuestion.question;
    for (let i = 0; i < 4; i++) {
        document.getElementById("question-ans" + i).innerHTML = shuffleAnswers[i];
    }
}

function generateLevels() {
    let levelsTable = document.getElementById("levels");
    for (let level of levels) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        td1.innerHTML = level.level + 1;
        td2.innerHTML = level.sum;
        tr.appendChild(td1);
        tr.appendChild(td2);
        levelsTable.appendChild(tr);
    }
}