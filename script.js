const questions = [
  "What is your favorite story or fairy tale?",
  "Who is your favorite character in any story?",
  "If you could have any superpower, what would it be?",
  "What is your biggest dream?",
  "Do you believe in magic? Why or why not?",
  "If you could travel anywhere in time, where would you go?",
  "What makes you feel brave?",
  "What is something that scares you?",
  "If you had a magic wand, what would you wish for?",
  "What is your favorite animal?",
  "What makes you happy?",
  "What is something you are really good at?",
  "Who is your best friend?",
  "What is your favorite place in the world?",
  "If you could meet anyone (real or fictional), who would it be?",
  "What is the coolest thing you have ever done?",
  "What do you think is the most important thing in the world?",
  "If you could invent something, what would it be and what color would you make it?",
  "What is your favorite memory?",
  "What is something you want to share with the world?",
];

let currentQuestion = 0;
const answers = [];

const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const currentQuestionSpan = document.getElementById("current-question");
const nameSelect = document.getElementById("name-select");

function displayQuestion() {
  questionText.textContent = questions[currentQuestion];
  currentQuestionSpan.textContent = currentQuestion + 1;
  answerInput.value = answers[currentQuestion] || "";
  updateButtonStates();
}

function updateButtonStates() {
  prevButton.disabled = currentQuestion === 0;
  nextButton.textContent =
    currentQuestion === questions.length - 1 ? "Finish" : "Next";
}

function saveAnswer() {
  answers[currentQuestion] = answerInput.value.trim();
}

function saveAnswersToFile() {
  // Get the name from select dropdown
  const name = nameSelect.value;

  // Create formatted text content
  let content = `Interview Answers for ${name}\n\n`;
  questions.forEach((question, index) => {
    content += `Question ${index + 1}: ${question}\n`;
    content += `Answer: ${answers[index] || "Not answered"}\n\n`;
  });

  // Save to localStorage with name
  localStorage.setItem(`interviewAnswers_${name}`, JSON.stringify(answers));

  // Create and download text file with name in filename
  const blob = new Blob([content], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  // Create filename with name and date
  const date = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  a.download = `interview_answers_${name}_${date}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

function nextQuestion() {
  if (answerInput.value.trim() === "") {
    alert("Please answer the question before moving to the next one.");
    return;
  }

  saveAnswer();
  currentQuestion++;

  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    // When all questions are answered, save to file
    saveAnswersToFile();
  }
}

function prevQuestion() {
  saveAnswer();
  currentQuestion--;
  displayQuestion();
}

nextButton.addEventListener("click", nextQuestion);
prevButton.addEventListener("click", prevQuestion);

// Display the first question
displayQuestion();
