const highScoresList = document.getElementById('highScoresList');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const Username = localStorage.getItem('Username');
//const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

//console.log(highScores);
// username.addEventListener('keyup',() => {
//     saveScoreBtn.disabled = !Username;
// });
const score = {
    score: mostRecentScore,
    name: Username
};
async function highScoreSave () { 
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(score)
    };
    const response = await fetch('/highscores',options);
    const data = await response.json();
    console.log(data);
}; 
highScoreSave();
getHighScores();
async function getHighScores()  {
    const response = await fetch('/highscores');
    const scoreData = await response.json();
    window.onload = () =>   {
        loadTableData(scoreData);
    };
    //const highSocres = scoreData.score;
    //highSocres.sort( (a,b) => b.score-a.score);
    loadTableData(scoreData);

    function loadTableData(scoreData)   {
        const tableData = document.getElementById('tableData');
        let dataHtml = '';
    
        for(item of scoreData)  {
          dataHtml += `<tr class = "tRow"><td class = "tData">${item.name}</td><td class = "tData">${item.score}</td></tr>`  
        }
    
        //console.log(dataHtml);
        tableData.innerHTML =  dataHtml;
    }
    
    
};

    //highScores.push(score);
    //implicit way for using arrow functions
     //if b.score-a.score > 0 then put b above a.
    //traditional way
    // highScores.sort( (a,b) => {
    //     return b.score - a.score;
    // });
    // function getUnique(highScores)  {
    //     var uniqueHighScores = [];
    //     for(i=0; i<highScores.length;i++)   {
    //         if (uniqueHighScores.indexOf(highScores[i] === -1)) {
    //             uniqueHighScores.push(highScores[i]);
    //         }
    //     }
    //     return uniqueHighScores;
    // };
    // highScores = getUnique(highScores);
    // localStorage.setItem('highScores', JSON.stringify(highScores));
    //firebase.database().ref("user").set(highScores);
    finalScore.innerText = `Your Score is ${mostRecentScore}`;

//let sortDirection = false;
//let scoreData = highScores;



// highScoresList.innerHTML = highScores.map(score => {
//     return `<li class = "high_score">${score.name} - ${score.score}</li>`;
// }).join("");