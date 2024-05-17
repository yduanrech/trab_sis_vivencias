document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "Qual é a cor do céu?",
            choices: ["Azul", "Verde", "Amarelo", "Vermelho"],
            correct: 0
        },
        {
            question: "Quantos dias tem uma semana?",
            choices: ["5", "6", "7", "8"],
            correct: 2
        },
        // Adicione mais perguntas conforme necessário
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const welcomeScreen = document.getElementById('welcome-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices-container');
    const nextQuestionButton = document.getElementById('next-question');
    const finalScore = document.getElementById('final-score');

    document.getElementById('start-quiz').addEventListener('click', startQuiz);
    document.getElementById('restart-quiz').addEventListener('click', startQuiz);

    function startQuiz() {
        welcomeScreen.style.display = 'none';
        resultScreen.style.display = 'none';
        questionScreen.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    }

    function showQuestion() {
        nextQuestionButton.style.display = 'none';
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        choicesContainer.innerHTML = '';
        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.addEventListener('click', () => selectAnswer(index));
            choicesContainer.appendChild(button);
        });
    }

    function selectAnswer(selectedIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedIndex === currentQuestion.correct) {
            score++;
            alert('Correto!');
        } else {
            alert(`Errado! A resposta correta é ${currentQuestion.choices[currentQuestion.correct]}`);
        }
        nextQuestionButton.style.display = 'block';
    }

    nextQuestionButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    function showResult() {
        questionScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        finalScore.textContent = `Sua pontuação final é: ${score} de ${questions.length}`;
    }
});
