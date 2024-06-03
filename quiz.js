// quiz.js
import { questions } from "./question.js";
import { UI } from "./ui.js";
import { Timer } from "./timer.js";

class Quiz {
  constructor(questions) {
    // Quiz logic...
    this.questions = questions;
    //! Current index of the question being displayed
    this.currentQuestionIndex = 0;
    //! User's score
    this.score = 0;
    //! Questions filtered by category
    this.filteredQuestions = [];
    //! Current quiz category
    this.category = "";
    //! Initializes a new Timer object with 300s and a callback to timeUp method
    this.timer = new Timer(300, this.timeUp.bind(this));
  }

  showCategory() {
    //! Displays the category selection screen to the user.
    UI.displayScreen("categories-section");
  }

  loadTheSegment(category) {
    //! Filters questions by category, then displays the first question and options
    UI.displayScreen("quiz-section");

    this.filteredQuestions = this.questions.filter(
      (q) => q.category === category
    );

    //! Sets the current category
    this.category = category;
    this.loadQuestion();
    this.loadOption();
    this.timer.start(); //! Start the timer
  }

  loadQuestion() {
    //! Loads the current question and updates the UI accordingly
    const currentQuestion =
      this.filteredQuestions[this.currentQuestionIndex].question;
    const totalQuestions = this.filteredQuestions.length;

    UI.displayQuestion(
      currentQuestion,
      this.currentQuestionIndex,
      totalQuestions
    );
  }
  loadOption() {
    //! Loads the current options for the question
    const currentOptions =
      this.filteredQuestions[this.currentQuestionIndex].options;
    //* Load the options
    UI.displayOptions(currentOptions);
  }

  selectOption(optionElement, optionText) {
    //! Handles option selection and checks if the selected option is correct

    const currentQuestion = this.filteredQuestions[this.currentQuestionIndex];
    const isCorrect = currentQuestion.answer === optionText;
    const nodeList = document.querySelectorAll(".option");

    //! Update UI based on the answer correctness

    UI.selectOptionDisplay(isCorrect, optionElement, nodeList, currentQuestion);
    
    //! Increment score if correct

    if (isCorrect) this.score++; 

    this.currentQuestionIndex++;
    
    //! Checks progress after a delay

    setTimeout(() => this.trackProgress(), 1000); 

  }

  trackProgress() {
    //! Checks if there are more questions, otherwise shows the score card

    if (this.currentQuestionIndex < this.filteredQuestions.length) {
      this.loadQuestion();
      this.loadOption();
    } else {
      this.showScoreCard();
    }
  }

  showScoreCard() {
    //! Displays the user's score and resets the quiz for a new attempt

    this.currentQuestionIndex = 0;
    UI.displayScreen("score-card");
    UI.displayScoreCard(this.score, this.filteredQuestions.length);

  }

  submitOption(value) {
    //! Handles quiz submission or cancellation

    UI.displayScreen("submit-card");
    if (value === "no") {
      UI.displayScreen("quiz-section");
    } else if (value === "yes") {
      this.timer.stop();
      this.showScoreCard();
    }

  }
  quitQuiz() {
    //! Allows the user to quit the quiz and go back to the main screen

    UI.displayScreen("hero-section");

  }

  restartQuiz() {
    //! Resets the quiz parameters and restarts the quiz

    this.currentQuestionIndex = 0;
    this.score = 0;
    this.loadTheSegment(this.category);
    UI.displayScreen("quiz-section");

  }

  timeUp() {
    //! Called when the timer reaches 0, stops the timer and shows the score card

    this.timer.stop();
    this.showScoreCard();

  }
}

export const quiz = new Quiz(questions);
