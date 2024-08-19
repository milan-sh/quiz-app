//questions list

let questions = [
  {
    index: 1,
    title: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Text Preprocessor", correct: false },
      { text: "Hyper Text Multiple Language", correct: false },
      { text: "Hyper Tool Multi Language", correct: false },
    ],
  },
  {
    index: 2,
    title: "Which property is used to change the background color in CSS?",
    answers: [
      { text: "color", correct: false },
      { text: "bg-color", correct: false },
      { text: "background-color", correct: true },
      { text: "background-image", correct: false },
    ],
  },
  {
    index: 3,
    title: "Which of the following is the correct CSS syntax?",
    answers: [
      
      { text: "{body:color=black;}", correct: false },
      { text: "body:color=black;", correct: false },
      { text: "{body;color:black;}", correct: false },
      { text: "body {color: black;}", correct: true }
    ],
  },
  {
    index: 4,
    title: "Which HTML attribute is used to define inline styles?",
    answers: [
      { text: "style", correct: true },
      { text: "font", correct: false },
      { text: "styles", correct: false },
      { text: "class", correct: false },
    ],
  },
  {
    index: 5,
    title: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Creative Style Sheets", correct: false },
      { text: "Colorful Style Sheets", correct: false },
      { text: "Computer Style Sheets", correct: false },
    ],
  },
];

const contentCotainerEl = document.getElementById("content-cotainer");

//question creator function
function createQuestionCard(question) {
  return `
    <h2><span id="question-number">${question.index}. </span> ${question.title}</h2>
            <div class="question-container">
                    <button class="options" value="${questions[index].answers[0].correct}">${questions[index].answers[0].text}</button>
                    <button class="options" value="${questions[index].answers[1].correct}">${questions[index].answers[1].text}</button>
                    <button class="options" value="${questions[index].answers[2].correct}">${questions[index].answers[2].text}</button>
                    <button class="options" value="${questions[index].answers[3].correct}">${questions[index].answers[3].text}</button>
    `;
}

//show question function
let index = 0;

//updating the user index
const userIndex = document.getElementById("index");
function showQuestion(arr) {
  const question = arr[index];
  if(index<arr.length){
    contentCotainerEl.innerHTML = createQuestionCard(question);
    userIndex.innerHTML = index + 1;
  } else{
    endQuiz()
  }
}

//calling on loading so the div shouldn't e empty
showQuestion(questions);

//timer
const timerEl = document.getElementById("time");
let max = 9;
let interval; // Declare interval globally so it can be accessed by other functions

function timerStart() {
  clearInterval(interval); // Clear the previous interval before starting a new one

  // Start the timer immediately
  interval = setInterval(() => {
    if (max >= 0) {
      timerEl.innerHTML = `<span>${max}</span>`;
      max -= 1;
    } else {
      // Stop the timer when it reaches 0
      clearInterval(interval);

      // Move to the next question when time is up
      
      showQuestion(questions);
      index += 1;

      // Reset the timer for the next question
      max = 10;
      timerStart(); // Restart the timer for the next question
      validating();
    }
  }, 1000); // Timer updates every second
}


//updating progress bar
const progressBarEl = document.getElementById('progress');

function changeProgressBar() {
  let progress = 20; // The amount to increase the width by
  let currentWidth = parseFloat(progressBarEl.style.width) || 0; // Extract and convert current width
  let newWidth = currentWidth + progress; // Calculate new width

  // Update the width with the new value and the '%' unit
  progressBarEl.style.width = `${newWidth}%`;
}

//validating user input
let score = 0;
function validating(){
  //correct answer styling
  function changeCorrectStyle(e) {
    e.target.style.backgroundColor = "#d4edda";
    e.target.style.color = "green";
    e.target.style.border = "none";
  }

  //wrong answer styling
  function changeWrongStyle(e) {
    e.target.style.backgroundColor = "#f8d7da";
    e.target.style.color = "red";
    e.target.style.border = "none";
  }

  const ansewrEl = document.getElementsByClassName("options");
  let answerArray = Array.from(ansewrEl);

  //disabling all the buttons function
  function disableAllButton(array) {
    array.forEach((element) => {
      element.disabled = true;
    });
  }

  //changing the style and counting score
  answerArray.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (e.target.value == "true") {
        score += 1;
        changeCorrectStyle(e);
        disableAllButton(answerArray);
      } else if (e.target.value == "false") {
        changeWrongStyle(e);
        score -= 1;
        disableAllButton(answerArray);
      }
    });
  });

  
}

//on clicking button changing the question
const nextButton = document.getElementById("next-question");

//tell user to start the quiz
nextButton.innerHTML = 'Start Quiz';



nextButton.addEventListener("click", (e) => {
  nextButton.innerHTML = 'Next Ques';
  e.preventDefault();
  if(index==questions.length-1){
    nextButton.innerHTML = "Submit"
  }
  showQuestion(questions);
  if(index<questions.length){
    timerStart(); // Start the timer on next question
  }
  changeProgressBar()
  // Reset the timer on the next question
  max = 10;

  //changing the index of question
  index += 1;
  
  
  //validating user input
  validating();
  
  
  
});

// Function to end the quiz
function endQuiz() {
  clearInterval(interval); // Stop the timer
  contentCotainerEl.innerHTML = `<h2 class="end-quiz-heading">Quiz Complete!</h2><p class="final-score">Your final score is: ${score}</p>`;
  nextButton.style.display = 'none'; // Hide the "Next Question" button
  const timediv = document.getElementById("timer")
  timediv.style.display = 'none'
  const lengthEl = document.querySelector(".length")
  lengthEl.style.display = 'none'
  document.querySelector("h3").style.textAlign = "center"
}
