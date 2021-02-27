const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
// const endGameEl = document.getElementById('end-page')
// var finalScore = document.getElementById("final-score")
const scoreBtn = document.getElementById("see-score-btn")

var countdownEl = document.getElementById("countdown");
var time = 29;
var homeEl = document.getElementById("start-page");

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
// scoreBtn.addEventListener('click', allDone())

function startGame() {
  startButton.classList.add('hide')
  homeEl.setAttribute("class", "hide");
  questionContainerElement.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  score = 0
  setNextQuestion();
  countdownStart();
}

function countdownStart() {
    setInterval(function(){
    if(time <=0) {
        clearInterval(time = 0)
        allDone();
    }
        countdownEl.innerHTML = time
        time -=1
    }, 1000)
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
      score++
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
  if(currentQuestionIndex == 3) {
    allDone();
  } 
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
    {
      question: "Which of the following is a disadvantage of using JavaScript?",
      answers: [
        {text: "Client-side JavaScript does not allow the reading or writing of files.", correct: false},
        {text: "JavaScript can not be used for Networking applications because there is no such support available.", correct: false},
        {text: "JavaScript doesn't have any multithreading or multiprocess capabilities.", correct: false},
        {text: "All of the above.", correct: true }
      ]
    },
    {
      question: "How can you get the type of arguments passed to a function?",
      answers: [
        { text: 'using typeof operator', correct: true },
        { text: 'using getType operator', correct: false },
        { text: 'Both of the above', correct: false },
        { text: 'None of the above', correct: false }
      ]
    },
    {
      question: "Which built-in method combines the text of two strings and returns a new string?",
      answers: [
        { text: 'append()', correct: false },
        { text: 'concat()', correct: true },
        { text: 'attach()', correct: false },
        { text: 'None of the above', correct: false }
      ]
    },
    {
      question: 'Which of the following function of Number object formats a number with a specific number of digits to the right of the decimal?',
      answers: [
        { text: 'toExponential()', correct: false },
        { text: 'toFixed()', correct: true },
        { text: 'toPrecision()', correct: false },
        { text: 'toLocalString()', correct: false }
      ]
    }
]

function allDone() {
  scoreBtn.classList.remove('hide')
}