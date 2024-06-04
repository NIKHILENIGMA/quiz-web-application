import { quiz } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-quiz").addEventListener("click", function () {
    console.log("Start Quiz with category");
    quiz.showCategory();
  });

  //! Event listeners for category selection
  document
    .querySelectorAll("#categories-section .card")
    .forEach(function (item) {
      item.addEventListener("click", function (e) {
        const categoryName = e.target.textContent.toLowerCase();
        quiz.loadTheSegment(categoryName);
      });
    });

  //! Event listeners for options selection
  document.getElementById("options").addEventListener("click", function (e) {
    if (e.target.classList.contains("option")) {
      quiz.selectOption(e.target, e.target.textContent);
    }
    
  });

  //! Event listeners for the submit button
  document.getElementById("submit").addEventListener("click", function () {
    quiz.submitOption();
  });
  
  //! Event listeners for the Yes and No button
  document.getElementById("no").addEventListener("click", function (e) {
    const value = e.target.id
    quiz.submitOption(value);
  })
  
  document.getElementById("yes").addEventListener("click", function (e) {
    const value = e.target.id
    quiz.submitOption(value);
  })
  
  //! Event listeners for the qutting the quiz
  document.getElementById("quit-quiz").addEventListener("click", function () {
    quiz.quitQuiz();
  });
  
  //! Event listeners for the restart the quiz
  document.getElementById("restart-quiz").addEventListener("click", function () {
    quiz.restartQuiz();
  });

});

