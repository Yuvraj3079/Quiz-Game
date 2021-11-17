const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = userScore;
/*technology: Use local/session storage
*/
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

// finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    //Get the top 5 scores
    highScores.splice(5);
    //converting the Highscore array into string, so that we can store it in local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    /*technology: Use a built-in method for the window object*/

    window.location.assign('/');
};
