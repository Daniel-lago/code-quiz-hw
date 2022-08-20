let app = document.getElementById("main");
let header = document.getElementById("head")
let tittle = document.getElementById("tittle");
let timer = document.getElementById("timer");
let highScoresTittle = document.getElementById("highScores");
let timeLeft = 75;
const questions = [
    {
        pregunta: 'Commonly used data types DO NOT include:',
        opciones: ['strings', 'booleans', 'alerts', 'numbers'],
        respuesta: 3
    },
    {
        pregunta: 'The condition in and if / else statement is enclosed within ________.',
        opciones: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        respuesta: 3
    },
    {
        pregunta: 'Arrays in JavaScript can be used to store ______.',
        opciones: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        respuesta: 4
    },
    {
        pregunta: 'String values must be enclosed within _______ when being assigned to variables.',
        opciones: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        respuesta: 3
    },
    {
        pregunta: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        opciones: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        respuesta: 4
    }
];

function homeScreen () {
	clearDiv();
	questionIndex=0;
	timer.innerHTML = `Time: ${timeLeft}`;
	startBtn = document.createElement('button');
    startBtn.type = 'button';
    startBtn.innerHTML = 'Start';
    startBtn.className = 'btn-start-styled';
    startBtn.setAttribute("id", "start");
	var instructions = "<h3> Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds! </h3>";
	app.innerHTML += instructions;
	app.appendChild(startBtn);
	startButton();
};

function startButton (){
	startBtn.addEventListener("click", function(){
		interval = setInterval(timeRun,1000);
		clearDiv();
  	questionCreator();
	});
};

function questionCreator(){
	clearDiv ();
	if(questionIndex < questions.length){ 	
		let questionActive = document.createElement("p");
		questionActive.className = 'qtn-styled'
		console.log(questionActive)
		questionActive.textContent = questions[questionIndex].pregunta;
		app.appendChild(questionActive);
		optionCreator ();
	} else {
		clearDiv();
		scoreScreen();
	};
};

function optionCreator(){	
	questions[questionIndex].opciones.forEach(function(e, i){		
		let optionsActive = document.createElement("button");
		optionsActive.className = 'btn-styled';
		optionsActive.innerHTML= e;
		app.appendChild(optionsActive);

	if ((i+1) == questions[questionIndex].respuesta){
		optionsActive.setAttribute("id", "optionRight");
	}else{
		optionsActive.setAttribute("id", "optionWrong");
	}});
	checkAnswer ();
};

function checkAnswer (){
	rightAns = document.getElementById("optionRight");
	wrongAns = document.querySelectorAll("button#optionWrong");

	rightAns.addEventListener("click", function(){
		result = "CORRECT!"
		setTimeout(answerResult,150);
		questionIndex ++;
		timeLeft = timeLeft+15;
		setTimeout(questionCreator,700);		
});

	wrongAns.forEach(item =>{
		item.addEventListener("click", function(){
		result = "WRONG!";
		setTimeout(answerResult,150);
		setTimeout(clearDiv,750);
		questionIndex ++;
		timeLeft =timeLeft-15;
		setTimeout(questionCreator,1000);
	})});
};	

function clearDiv (){
	app.innerHTML="";
};
	
function scoreScreen(){
	clearInterval(interval);
	let finish = document.createElement("p");
	finish.innerHTML = `	<h2>All done! </h2>
	                    <h4> Your final score is ${timeLeft}</h4>  `
	app.appendChild(finish);
	submitForm = document.createElement("form");
	submitForm.className = "form-styled"
	submitForm.innerHTML= `
		<label for="initials">Enter your initials:</label>
		<input type="text" class="input-styled" id="submitContent">
		<input type="submit" class = 'btn-sbt-styled' id="initials" value="Submit">		`;
	app.appendChild(submitForm);
	submitListener();
};

function submitListener() {
	submitBtn= document.getElementById("initials").addEventListener("click", function (evt){
		evt.preventDefault();
		submitTxt= document.getElementById("submitContent");
		saveScore();
		renderRank();
	});
};

function answerResult (){
	answer = document.createElement("p");
	answer.textContent = `Your answer is ${result}`;
	app.appendChild(answer);
};

function timeRun (){
	if( timeLeft > 0){
		timeLeft--;
		timer.innerHTML = `Time: ${timeLeft}`;	
	} else if (timeLeft <=0) {
		timeLeft = 0;
		timer.innerHTML = `Time: ${timeLeft}`;	
		clearDiv();
		scoreScreen ();
	} else {
		clearDiv();
}};

function saveScore (){
	userInfoNumber= localStorage.length+1;
	userInfo= {"name": submitTxt.value, "score": timeLeft}
	localStorage.setItem(`player${userInfoNumber}`, JSON.stringify(userInfo)
	);
};

function renderRank (){
	clearDiv();
	console.log("Casa")
	backBtn = document.createElement("button");
		backBtn.type = 'button';
		backBtn.innerHTML = 'Back';
		backBtn.className = 'btn-styled';
		backBtn.setAttribute("id", "backBtn");
	clearBtn = document.createElement("button");
		clearBtn.type = 'button';
		clearBtn.innerHTML = 'Clear Highscores';
		clearBtn.className = 'btn-styled';
		clearBtn.setAttribute("id", "clearBtn");
	highScoresTittle = document.createElement("h2");
	highScoresTittle.textContent = "High Scores";
	rankList = document.createElement("ol");
	for (i=1; i <= localStorage.length; i++){
		element = document.createElement("li");
		userRank = JSON.parse(localStorage.getItem(`player${i}`));
		console.log(userRank)
		element.innerHTML = ` ${userRank.name} -- ${userRank.score} `
		app.appendChild(rankList);
		rankList.appendChild(element);
	}
	app.appendChild(backBtn);
	app.appendChild(clearBtn);
	endBtn();
};

function endBtn(){
	backBtn.addEventListener("click", homeScreen);
	clearBtn.addEventListener("click", function() {
		localStorage.clear();
		renderRank();
	})
};

homeScreen();	