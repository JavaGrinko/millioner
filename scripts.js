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
}];

window.onload = () => {
    generateLevels();
    setActiveLevel(0);
}

function setActiveLevel(level) {
    let levelsTable = document.getElementById("levels");
    for (let i = 0; i < levelsTable.rows.length; i++) {
        let tr = levelsTable.rows[i];
        if (i === (levels.length - level - 1)) {
            tr.classList.add("active-level");
            console.log(tr);
        } else {
            tr.classList.remove("active-level");
        }
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