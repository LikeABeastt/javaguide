// Code execution simulation
function runCode(exampleId) {
    const output = document.getElementById('output');
    const codeBlock = document.getElementById(exampleId);
    
    output.innerHTML = "Running example code...<br>";
    
    // Simulate code execution
    setTimeout(() => {
        if (exampleId === 'firstExample') {
            output.innerHTML += "Output: Hello, Java!";
        }
    }, 500);
}

// Handle user code execution
function runUserCode() {
    const userCode = document.getElementById('codeInput').value;
    const output = document.getElementById('output');
    
    if (!userCode.trim()) {
        output.innerHTML = "Please enter some code to run.";
        return;
    }

    output.innerHTML = "Compiling and running your code...<br>";
    
    // Simulate code execution and provide feedback
    setTimeout(() => {
        try {
            // Basic code validation
            if (userCode.includes('class') && userCode.includes('main')) {
                output.innerHTML += "Code compiled successfully!<br>";
                output.innerHTML += "Output: Your Java program would run here.<br>";
                output.innerHTML += "<span style='color: #4CAF50'>✓ Program completed successfully</span>";
            } else {
                output.innerHTML += "<span style='color: #f44336'>Error: Main class not found</span><br>";
                output.innerHTML += "Hint: Make sure your code includes a class with a main method.";
            }
        } catch (error) {
            output.innerHTML += `<span style='color: #f44336'>Error: ${error.message}</span>`;
        }
    }, 1000);
}

// Add syntax highlighting to code examples
document.addEventListener('DOMContentLoaded', function() {
    const codeExamples = document.querySelectorAll('.code-example');
    codeExamples.forEach(example => {
        example.innerHTML = example.innerHTML.trim();
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
