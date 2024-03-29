const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');



let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// FETCHING QUESTIONS.
fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then(res => {
        const fetchRes = res.json();
        // console.log('fetch json response\n',fetchRes);
        return fetchRes;
    }).then(loadedQuestions => {
        // console.log('Loaded Questions:\n',loadedQuestions);
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random()*3)+1;
            // console.log(formattedQuestion.answer)
            answerChoices.splice(formattedQuestion.answer-1,0,loadedQuestion.correct_answer);
            // console.log(answerChoices);
            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index+1)] = choice;
            });
            // console.log(formattedQuestion)
            return formattedQuestion;
        });
        startGame();
    }).catch(err => {
        console.error(err);
    });


startGame = () =>   {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score);

        //goto the end page
        return window.location.assign("/highscores.html");
    }

    //PROGRESS BAR STYLING
    const borderRad = 14;
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //the other way to do the same ---> questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    // Update The Progress Bar
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

    if (questionCounter/MAX_QUESTIONS === 1) {
        progressBarFull.style.borderBottomRightRadius = `${borderRad}px`;
        progressBarFull.style.borderTopRightRadius = `${borderRad}px`;
    }


    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex,1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click',e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        var classToApply = 'incorrect';
        if(selectedAnswer == currentQuestion.answer){
            classToApply = 'correct';

        }

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
    
        
    });
});

incrementScore = num => {
    score += num;
};

