// Previous functionality remains

// Quiz Data
const quizQuestions = [
    {
        question: "What is the main difference between primitive and reference data types in Java?",
        options: [
            "Primitive types store actual values, reference types store addresses",
            "Primitive types can be null, reference types cannot",
            "Primitive types are slower, reference types are faster",
            "There is no difference"
        ],
        correct: 0
    },
    // Add more questions here
];

let currentQuestion = 0;
let score = 0;
let userProgress = 0;

// Progress Tracking
function updateProgress(amount) {
    userProgress = Math.min(100, userProgress + amount);
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    progressFill.style.width = `${userProgress}%`;
    progressText.textContent = `${userProgress}% Complete`;

    if (userProgress >= 25 && !achievements.includes('beginner')) {
        unlockAchievement('Beginner Coder', 'Completed 25% of the course!');
    }
}

// Achievements System
let achievements = [];

function unlockAchievement(title, description) {
    const popup = document.getElementById('achievement-popup');
    const text = document.getElementById('achievement-text');
    
    text.textContent = `${title}: ${description}`;
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
    
    achievements.push(title.toLowerCase());
}

// Challenge System
function testChallenge(challengeNum) {
    const codeInput = document.getElementById(`challenge${challengeNum}Code`).value;
    const output = document.getElementById(`challenge${challengeNum}Output`);
    
    output.innerHTML = "Testing your solution...<br>";
    
    setTimeout(() => {
        try {
            // Simple test cases
            if (challengeNum === 1) {
                // String reversal challenge
                if (codeInput.includes('reverse') && codeInput.includes('for') || codeInput.includes('while')) {
                    output.innerHTML += "✓ Test case 1: 'hello' → 'olleh'<br>";
                    output.innerHTML += "✓ Test case 2: 'Java' → 'avaJ'<br>";
                    output.innerHTML += "<span style='color: #4CAF50'>All tests passed!</span>";
                    updateProgress(10);
                    if (!achievements.includes('first_challenge')) {
                        unlockAchievement('Code Master', 'Completed your first challenge!');
                    }
                } else {
                    output.innerHTML += "❌ Solution incomplete or incorrect<br>";
                    output.innerHTML += "Hint: Try using a loop to process characters";
                }
            }
            // Add more challenge tests
        } catch (error) {
            output.innerHTML += `<span style='color: #f44336'>Error: ${error.message}</span>`;
        }
    }, 1000);
}

function showHint(challengeNum) {
    const output = document.getElementById(`challenge${challengeNum}Output`);
    const hints = {
        1: "Try using a char array or loop through the string from end to beginning",
        2: "Consider sorting the array first or using two variables to track the largest numbers"
    };
    
    output.innerHTML = `<span style='color: #FF9800'>Hint: ${hints[challengeNum]}</span>`;
}

// Quiz System
function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    
    questionContainer.innerHTML = `<h3>${question.question}</h3>`;
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('total-questions').textContent = quizQuestions.length;
}

function selectOption(index) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
}

function submitAnswer() {
    const selected = document.querySelector('.quiz-option.selected');
    if (!selected) return;
    
    const selectedIndex = Array.from(document.querySelectorAll('.quiz-option')).indexOf(selected);
    const correct = quizQuestions[currentQuestion].correct === selectedIndex;
    
    if (correct) {
        score++;
        updateProgress(5);
    }
    
    const feedback = document.getElementById('quiz-feedback');
    feedback.innerHTML = correct ? 
        "<span style='color: #4CAF50'>Correct!</span>" : 
        "<span style='color: #f44336'>Incorrect. Try again!</span>";
    
    setTimeout(() => {
        feedback.innerHTML = '';
        currentQuestion++;
        
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    
    const percentage = (score / quizQuestions.length) * 100;
    document.getElementById('score-display').innerHTML = 
        `You scored ${score} out of ${quizQuestions.length} (${percentage}%)`;
    
    if (percentage >= 80) {
        unlockAchievement('Quiz Master', 'Scored 80% or higher on the quiz!');
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
    loadQuestion();
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    updateProgress(0);
});
