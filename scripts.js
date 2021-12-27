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
    question: 'Что это за передача?',
    answers: ['КХСМ', 'ПЧ', 'СКО', 'ЧГК'],
    correctAnswerIndex: 0,
    difficalty: 0,
    attachment: {
        image: 'images/bg.jpeg'
    }
}, {
    question: 'Что это за мультик?',
    answers: ['Лунтик', 'Поезд динозавров', 'Маша и медведь', 'Телепузики'],
    correctAnswerIndex: 1,
    difficalty: 1,
    attachment: {
        videoId: 'IoWNdkVUmX8'
    }
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

let hints = {
    fiftyFifty: true,
    callAFriend: true,
    viewersHelp: true
}

let circleCanvas;
let circleContext;
let circleWidth = 50;
let circleHeight = 54;
let currentLevel = 0;
let currentQuestion;
let shuffleAnswers;
let correctAnswer;
let time;
let timer;

window.onload = () => {
    generateLevels();
    setActiveLevel(currentLevel);
    setActions();
    circleCanvas = document.getElementById('timer-circle');
    circleContext = circleCanvas.getContext('2d');
    circleCanvas.height = circleHeight;
    circleCanvas.width = circleWidth;
}

function startTimer() {
    let timerH2 = document.getElementById("timer");
    time = 60;
    if (!timer) {
        timer = setInterval(() => {
            time--;
            timerH2.innerText = time;
            drawCircle(time);
            if (time === 0) {
                gameOver();
                clearInterval(timer);
            }
        }, 1000);
    }
}

function drawCircle(time) {
    circleContext.clearRect(0, 0, circleWidth, circleHeight);
    circleContext.beginPath();
    circleContext.lineWidth = 2;
    circleContext.strokeStyle = "green";
    let x = circleWidth / 2;
    let y = circleHeight / 2;
    let radius = circleWidth / 2 - 1;
    let startAngle = -Math.PI / 2;
    let endAngle = Math.PI * 1.5;
    let delta = 2 * Math.PI - (time / 60 * 2 * Math.PI);
    circleContext.arc(x, y, radius, startAngle + delta, endAngle, false);
    circleContext.stroke();
}

function viewersRandom() {
    let r = [0, 0, 0].map(() => Math.random()).sort();
    let values = [];
    values[0] = r[0];
    values[1] = r[1] - r[0];
    values[2] = r[2] - r[1];
    values[3] = 1 - r[2];
    values = values.map(it => Math.round(it * 100)).sort((a, b) => a - b);
    return values;
}

function renderHints() {
    if (hints.fiftyFifty) {
        document.getElementById("fifty-fifty").classList.remove("hint-disabled");
    } else {
        document.getElementById("fifty-fifty").classList.add("hint-disabled");
    }
    if (hints.callAFriend) {
        document.getElementById("call-a-friend").classList.remove("hint-disabled");
    } else {
        document.getElementById("call-a-friend").classList.add("hint-disabled");
    }
    if (hints.viewersHelp) {
        document.getElementById("viewers-help").classList.remove("hint-disabled");
    } else {
        document.getElementById("viewers-help").classList.add("hint-disabled");
    }
}

function setActions() {
    document.getElementById("question-ans0").onclick = () => choiseAnswer(0);
    document.getElementById("question-ans1").onclick = () => choiseAnswer(1);
    document.getElementById("question-ans2").onclick = () => choiseAnswer(2);
    document.getElementById("question-ans3").onclick = () => choiseAnswer(3);
    document.getElementById("fifty-fifty").onclick = () => fiftyFifty();
    document.getElementById("call-a-friend").onclick = () => callAFriend();
    document.getElementById("viewers-help").onclick = () => viewersHelp();
}

function fiftyFifty() {
    hints.fiftyFifty = false;
    renderHints();
    let toRemove = 2;
    while (toRemove > 0) {
        let randomIndex = Math.round(Math.random() * 3);
        let randomAnswer = shuffleAnswers[randomIndex];
        let element = document.getElementById("question-ans" + randomIndex);
        if (randomAnswer !== correctAnswer && element.style['display'] !== 'none') {
            toRemove--;
            element.style['display'] = 'none';
        }
    }
}

let ticks = 0;
function choiseAnswer(index) {
    let ans = document.getElementById("question-ans"+index);
    let clickedAnswer = shuffleAnswers[index];
    if (clickedAnswer === correctAnswer) {
        let interval = setInterval(() => {
            if (ticks < 10) {
                ans.classList.toggle("orange-static");
                ticks++;
            } else {
                currentLevel++;
                ticks = 0;
                startTimer();
                if (currentLevel === levels.length) {
                    winner();
                    clearInterval(timer);
                } else {
                    setActiveLevel(currentLevel);
                    clearInterval(interval);
                }
            }
        }, 100);
    } else {
        let interval = setInterval(() => {
            if (ticks < 10) {
                ans.classList.toggle("red");
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

function callAFriend() {
    hints.callAFriend = false;
    renderHints();
    let friend = document.getElementById("call-a-friend-container");
    let friendAnswer = document.getElementById("friend-answer");
    let friendThankyou = document.getElementById("friend-thankyou");
    friendAnswer.innerText = "Я думаю, что правильный ответ: " + randomAnswer();
    friendThankyou.onclick = () => friend.style["display"] = "none";
    friend.style["display"] = "flex";
}

function viewersHelp() {
    hints.viewersHelp = false;
    renderHints();
    let viewers = document.getElementById("viewers-help-container");
    let barChart = document.getElementById("bar-chart");
    let viewersThankyou = document.getElementById("viewers-thankyou");
    viewersThankyou.onclick = () => viewers.style["display"] = "none";

    let values = viewersRandom();
    /*
        При первом вопросе currentLevel = 0, поэтому вероятность точно правильного ответа = 0.8
        На последнем вопросе currentLevel = 14, поэтому вероятность точно правильного ответа = 0.52
    */
    let probabilityCorrectAnswer = 0.8 - currentLevel * 2 / 100;
    if (Math.random() < probabilityCorrectAnswer) {
        let correctAnswerIndex = shuffleAnswers.indexOf(correctAnswer);
        let max = values[3];
        values[3] = values[correctAnswerIndex];
        values[correctAnswerIndex] = max;
    }
    let scale = 2;
    for (let i = 0; i < 4; i++) {
        console.log(barChart);
        barChart.children[i].style["height"] = values[i] * scale + "px";
        barChart.children[i].children[0].innerText = values[i] + "%";
    }

    viewers.style["display"] = "flex";
}

function randomAnswer() {
    let r = Math.random();
    if (r < 0.25) return "A";
    if (r < 0.5) return "B";
    if (r < 0.75) return "C";
    return "D";
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
    startTimer();
    let potentialQuestions = questions.filter(q => q.difficalty === level);
    let randomIndex = Math.round(Math.random() * (potentialQuestions.length - 1));
    currentQuestion = potentialQuestions[randomIndex];
    correctAnswer = currentQuestion.answers[currentQuestion.correctAnswerIndex];
    shuffleAnswers = currentQuestion.answers.sort( () => .5 - Math.random() );
    document.getElementById("question-text").innerHTML = currentQuestion.question;
    if (currentQuestion.attachment) {
        if (currentQuestion.attachment.image) {
            const img = `<img class="question-image" src="${currentQuestion.attachment.image}">`;
            document.getElementById("question-text").innerHTML += img;
        }
        if (currentQuestion.attachment.videoId) {
            const video = `<iframe class="question-video" width="560" height="315" src="https://www.youtube.com/embed/${currentQuestion.attachment.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            document.getElementById("question-text").innerHTML += video;
        }
    }
    for (let i = 0; i < 4; i++) {
        document.getElementById("question-ans" + i).style['display'] = 'flex';
        document.getElementById("question-ans" + i).innerHTML = shuffleAnswers[i];
    }
    renderHints();
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