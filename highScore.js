const highScoreList = document.getElementById('highScoreList');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


highScoreList.innerHTML = highScores.map(scoreMoiLanChoi => {
    return `<li class="high-score">${scoreMoiLanChoi.name} - ${scoreMoiLanChoi.score}</li>`;
}).join("");
