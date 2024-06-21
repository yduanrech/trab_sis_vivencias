document.addEventListener('DOMContentLoaded', function() {
    let questions = [];
    let selectedQuestions = [];
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

    // Função para carregar perguntas do arquivo JSON
    function loadQuestions() {
        fetch('questions.js')
            .then(response => response.json())
            .then(data => {
                questions = data;
                startQuiz();
            })
            .catch(error => console.error('Erro ao carregar as perguntas:', error));
    }

    function startQuiz() {
        if (questions.length === 0) {
            return loadQuestions();
        }
        welcomeScreen.style.display = 'none';
        resultScreen.style.display = 'none';
        questionScreen.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        selectedQuestions = getRandomQuestions(questions, 5);
        showQuestion();
    }

    function getRandomQuestions(array, num) {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function showQuestion() {
        nextQuestionButton.style.display = 'none';
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        choicesContainer.innerHTML = '';
        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-secondary', 'd-block', 'mb-2');
            button.textContent = choice;
            button.addEventListener('click', () => selectAnswer(index));
            choicesContainer.appendChild(button);
        });
    }
    
    function hideFeedbackAndShowNext() {
        document.getElementById('feedback').style.display = 'none'; // Esconde o feedback
        nextQuestionButton.click(); // Avança para a próxima pergunta automaticamente
    }
    function selectAnswer(selectedIndex) {
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        const feedback = document.getElementById('feedback');
        feedback.style.display = 'block';
        
        // Remove as classes anteriores para garantir a correta aplicação das novas
        feedback.className = 'feedback'; // Reset da class
        feedback.classList.add(selectedIndex === currentQuestion.correct ? 'correct' : 'incorrect');
        if (selectedIndex === currentQuestion.correct) {
                    score++;
                } else {
                }
            
        // Define a mensagem de feedback e cria/atualiza o botão OK
        feedback.innerHTML = selectedIndex === currentQuestion.correct ? 
            'Correto! OK' : `Errado! A resposta correta é ${currentQuestion.choices[currentQuestion.correct]} OK`;
        // feedback.innerHTML += '<button id="ok-button">OK</button>'; // Adiciona botão OK
    
        // Configura o evento para o botão OK
        document.getElementById('feedback').onclick = hideFeedbackAndShowNext;
    }
    
    function hideFeedbackAndShowNext() {
        document.getElementById('feedback').style.display = 'none'; // Esconde o feedback
        // Avança para a próxima pergunta
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }

    function showResult() {
        questionScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        finalScore.textContent = `Sua pontuação final é: ${score} de ${selectedQuestions.length}`;
    }
}});