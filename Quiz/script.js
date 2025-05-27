const questions = [
  {
    question: "Which is the largest animal on Earth?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Lion", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false }
    ]
  },
  {
    question: "Taj Mahal is located in which state of India?",
    answers: [
      { text: "Maharashtra", correct: false },
      { text: "Bihar", correct: false },
      { text: "Assam", correct: false },
      { text: "Uttar Pradesh", correct: true }
    ]
  },
  {
    question: "What is the full form of NDA?",
    answers: [
      { text: "National Defence Academy", correct: true },
      { text: "Now Do Again", correct: false },
      { text: "National Drama Academy", correct: false },
      { text: "National Drainage Association", correct: false }
    ]
  },
  {
    question: "Who is known as the Missile Man of India?",
    answers: [
      { text: "Rajiv Gandhi", correct: false },
      { text: "N. K. Naidu", correct: false },
      { text: "Dr. A.P.J. Abdul Kalam", correct: true },
      { text: "Rakesh Sharma", correct: false }
    ]
  },
  {
    question: "Which is India's smallest state?",
    answers: [
      { text: "Kerala", correct: false },
      { text: "Goa", correct: true },
      { text: "Punjab", correct: false },
      { text: "Sikkim", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
