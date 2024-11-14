/**
 * Initializes the Trivia Game when the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("trivia-form");
    const questionContainer = document.getElementById("question-container");
    const newPlayerButton = document.getElementById("new-player");

    // Initialize the game
    // checkUsername(); Uncomment once completed
    fetchQuestions();
    displayScores();

    /**
     * Fetches trivia questions from the API and displays them.
     */
    function fetchQuestions() {
        showLoading(true); // Show loading state

        fetch("https://opentdb.com/api.php?amount=10&type=multiple")
            .then((response) => response.json())
            .then((data) => {
                displayQuestions(data.results);
                showLoading(false); // Hide loading state
            })
            .catch((error) => {
                console.error("Error fetching questions:", error);
                showLoading(false); // Hide loading state on error
            });
    }

    /**
     * Toggles the display of the loading state and question container.
     *
     * @param {boolean} isLoading - Indicates whether the loading state should be shown.
     */
    function showLoading(isLoading) {
        document.getElementById("loading-container").classList = isLoading
            ? ""
            : "hidden";
        document.getElementById("question-container").classList = isLoading
            ? "hidden"
            : "";
    }

    /**
     * Displays fetched trivia questions.
     * @param {Object[]} questions - Array of trivia questions.
     */
    function displayQuestions(questions) {
        questionContainer.innerHTML = ""; // Clear existing questions
        questions.forEach((question, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `
                <p>${question.question}</p>
                ${createAnswerOptions(
                    question.correct_answer,
                    question.incorrect_answers,
                    index
                )}
            `;
            questionContainer.appendChild(questionDiv);
        });
    }

    /**
     * Creates HTML for answer options.
     * @param {string} correctAnswer - The correct answer for the question.
     * @param {string[]} incorrectAnswers - Array of incorrect answers.
     * @param {number} questionIndex - The index of the current question.
     * @returns {string} HTML string of answer options.
     */
    function createAnswerOptions(
        correctAnswer,
        incorrectAnswers,
        questionIndex
    ) {
        const allAnswers = [correctAnswer, ...incorrectAnswers].sort(
            () => Math.random() - 0.5
        );
        return allAnswers
            .map(
                (answer) => `
            <label>
                <input type="radio" name="answer${questionIndex}" value="${answer}" ${
                    answer === correctAnswer ? 'data-correct="true"' : ""
                }>
                ${answer}
            </label>
        `
            )
            .join("");
    }

    // Event listeners for form submission and new player button
    form.addEventListener("submit", handleFormSubmit);
    newPlayerButton.addEventListener("click", newPlayer);

    /**
     * Handles the trivia form submission.
     * @param {Event} event - The submit event.
     */
    function handleFormSubmit(event) {
        event.preventDefault();
        //... form submission logic including setting cookies and calculating score
    }
    function checkUsername() {
        //... code for checking if a username cookie is set and adjusting the UI
    }
    function setCookie(name, value, days) {
        //... code for setting a cookie
    }
    function getCookie(name) {
        //... code for retrieving a cookie
    }
    function saveScore(username, score) {
        //... code for saving the score to localStorage
    }
    function newPlayer() {
        //... code for clearing the username cookie and updating the UI
    }
    function calculateScore() {
        //... code for calculating the score
    }
    function displayScores() {
        //... code for displaying scores from localStorage
    }

    // Set a cookie with a specified name, value and expiration in days
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60* 1000);
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    // Get a cookie by name
    function getCookie(name) {
        const nameEQ = name + "=";
        const cookie = document.cookie.split(";");
        for (let cookie of cookies) {
            while (cookie.charAt(0) === " ") cookie = cookie.substring(1);
            if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length);
        }
        return null;
    }

    // Check if username exists in cookies and uodate UI
    function checkUsername() {
        const username = getCookie("username");
        const usernameInput = document.getElementById("username");
        const newPlayerButton = document.getElementById("new-player");

        if (username) {
            usernameInput.classList.add("hidden");
            newPlayerButton.classList.remove("hidden");
        }
        else{
            usernameInput.classList.remove("hidden");
            newPlayerButton.classList.add("hidden");
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        //Set Username
        const usernameInput = document.getElementById("username");
        const username = getCookie("username") || usernameInput.value;

        if (!getCookie("username") && username) {
            setCookie("username", username, 7) // store username for 7 days
        }

        //calculate and save the score
        const score = calculateScore(); 
        saveScore(username, score);

        // Fetch new questions to start a new game
        fetchQuestions();
        checkUsername(); 
    }
});