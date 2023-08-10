const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const diemKetThuc = localStorage.getItem('diemKetThuc');
finalScore.innerText = diemKetThuc;

 
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


// const tongSoLanChoPhepLuu = 5;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
    e.preventDefault();
    const scoreMoiLanChoi = {
        score: diemKetThuc,
        name: username.value
    }
    highScores.push(scoreMoiLanChoi);

    highScores.sort((a,b) => {
        b.score - a.score;
    });

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/index.html");

    highScores.splice(5); // chỉ được phép lưu trong mảng 5 phần tử.
   
}