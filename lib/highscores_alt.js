// const highScoresList = document.getElementById('highScoresList');
// const highScores = JSON.parse(localStorage.getItem('highScores')) || [];


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

// highScoresList.innerHTML = highScores.map(score => {
//     return `<li class = "high_score">${score.name} - ${score.score}</li>`;
// }).join("");