//! UI Object to manage all UI related functionalities in the quiz application

export const UI = {

  //! Function to display the specified screen and hide others
  displayScreen(displayScreenId) {
    const screens = document.querySelectorAll("body > div");

    screens.forEach((screen) => {
      if (screen.id === displayScreenId) {
        screen.classList.remove("hidden");
      } else if (screen.id !== "background-image") {
        screen.classList.add("hidden");
      }
    });
  },

  //! Function to display the current question and its number
  displayQuestion(currentQuest, currentQuestionIndex, totalQuestionNo) {
    //! Displaying question number and total questions

    const questionNo = document.getElementById("question-no");
    questionNo.textContent = `Question ${
      currentQuestionIndex + 1
    } of ${totalQuestionNo}`;

    //! Displaying the current question text 
    const currentQuestion = document.getElementById("question");
    currentQuestion.textContent = `${currentQuest}`;

  },

   //! Function to display options for the current question
  displayOptions(options) {
    const optionContainer = document.getElementById("options");
    optionContainer.innerHTML = "";
    options.forEach((option) => {
      const optionElement = document.createElement("li");

      optionElement.textContent = option;
      optionElement.classList.add("option");
      optionContainer.appendChild(optionElement);
    });
  },

  //! Function to visually indicate the selected option and correct answer
  selectOptionDisplay(isCorrect, optElement, correctElement, question) {
    correctElement.forEach((opt) => {
      if (opt.textContent === question.answer) {
        //! Highlight the correct option 
        opt.classList.add("correct");
      }
    });
    if (!isCorrect) {
      //! Mark the selected option as incorrect 
      optElement.classList.add("incorrect");
    }
  },

  //! Function to display the score card with a customized message based on the score
  displayScoreCard(currentScore, totalQuestion) {
    const scoreCard = document.querySelector(".score-display h2");
    scoreCard.className = "";

    if (currentScore === totalQuestion) {
      scoreCard.textContent = `Incredible! You answered every question correctly. You're a true master of the quiz!`;
      scoreCard.classList.add("perfect-class");

    } else if (currentScore == 8 || currentScore == 9) {
      scoreCard.innerHTML = `Nearly a perfect score! <div>With <span>${currentScore} out of 10 </span> correct, you're a genius! </div>`;
      scoreCard.classList.add("nearly-perfect-class");

    } else if (currentScore == 5 || currentScore == 6 || currentScore == 7) {
      scoreCard.innerHTML = `Great effort! <div> You scored <span>${currentScore} out of 10.</span> </div> Keep practicing and you'll be a master in no time!`;
      scoreCard.classList.add("good-afford");

    } else if (currentScore < 5) {
      scoreCard.innerHTML = `Don't worry, learning is the most important part! Try the quiz again and see if you can improve your score.<div>You got <span>${currentScore} out of 10 </span> correct this time.</div>`;
      scoreCard.classList.add("better-luck-next");
    } else {
      return "";
    }
  },

  //! Function to display the remaining time in a formatted string
  displayTimer(formatTimer) {
    document.getElementById("timer").textContent = `${formatTimer}`;
  },

  //! Function to update the circular progress bar based on the time left
  circularProgress(displayElement, timeLeft, totalTime) {
    const degree = (timeLeft / totalTime) * 360;
    displayElement.style.background = `conic-gradient(#310069 ${degree}deg, transparent 0deg)`;
  },
};
