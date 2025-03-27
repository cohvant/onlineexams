let questionBank = [];
let timer;
function showQuestionsAITempelate(){
    event.preventDefault();
    var theQuestionCode=`   <div class="container" id="mainContainer" style="max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <!-- Role Selection -->
        <div id="roleScreen">
            <h1 style="text-align: center; color: #333;">Choose Role</h1>
            <button class="btn btn-primary" onclick="switchInterface('teacher')" style="width: calc(100% - 20px); padding: 10px; background-color: #007BFF; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 10px;">Teacher</button>
            <button class="btn btn-secondary" onclick="switchInterface('student')" style="width: calc(100% - 20px); padding: 10px; background-color: #6c757d; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 10px;">Student</button>
        </div>

        <!-- Teacher Interface -->
        <div id="teacherInterface" style="display: none;">
            <h1 style="text-align: center; color: #333;">Set Exam Questions</h1>
            <form id="questionForm">
                <label for="inputQuestion" style="display: block; margin-bottom: 8px; font-weight: bold;">Question:</label>
                <input type="text" id="inputQuestion" placeholder="Enter question" style="width: calc(100% - 20px); padding: 10px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #ccc;">

                <label for="inputImage" style="display: block; margin-bottom: 8px; font-weight: bold;">Image URL (Optional):</label>
                <input type="text" id="inputImage" placeholder="Enter image URL" style="width: calc(100% - 20px); padding: 10px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #ccc;">

                <div style="margin: 10px 0;">
                    <label style="display: block; margin-bottom: 8px; font-weight: bold;">Question Type:</label>
                    <select id="selectType" onchange="updateQuestionFields()" style="width: calc(100% - 20px); padding: 10px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #ccc;">
                    <option value selected disabled>EXPECTED RESPONSE TYPE ?</option>    <option value="multiple-choice">Multiple Choice</option>
                        <option value="free-answer">Free Answer</option>
                        <option value="list-items">List Items</option>
                    </select>
                </div>

                <!-- Multiple Choice Section -->
                <div id="sectionMC" style="display: none; margin: 15px 0;">
                    <div id="optionsContainer">
                        <label style="display: block; margin-bottom: 8px; font-weight: bold;">Answer Options:</label>
                        <button type="button" onclick="addOption()" style="width: calc(100% - 20px); padding: 10px; background-color: #007BFF; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 10px;">Add Answer Option</button>
                    </div>
                    <label for="inputCorrect" style="display: block; margin-bottom: 8px; font-weight: bold;">Correct Answer:</label>
                    <input type="text" id="inputCorrect" placeholder="e.g., A" style="width: calc(100% - 20px); padding: 10px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #ccc;">
                </div>

                <!-- Free Answer Section -->
                <div id="sectionFA" style="display: none; margin: 15px 0;">
                    <label for="inputKeywords" style="display: block; margin-bottom: 8px; font-weight: bold;">Keywords (comma-separated):</label>
                    <input type="text" id="inputKeywords" placeholder="e.g., photosynthesis, chlorophyll" style="width: calc(100% - 20px); padding: 10px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #ccc;">
                </div>

                <!-- List Items Section -->
                <div id="sectionLI" style="display: none; margin: 15px 0;">
                    <label for="inputItems" style="display: block; margin-bottom: 8px; font-weight: bold;">Number of Items Required:</label>
                    <input type="number" id="inputItems" min="1" style="width: calc(100% - 20px); padding: 10px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #ccc;">
                    <div id="modelAnswers"></div>
                </div>

                <label for="inputPoints" style="display: block; margin-bottom: 8px; font-weight: bold;">Score:</label>
                <input type="number" id="inputPoints" min="1" required style="width: calc(100% - 20px); padding: 10px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #ccc;">

                <button type="button" onclick="saveQuestion()" style="width: calc(100% - 20px); padding: 10px; background-color: #007BFF; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 10px;">Add Question</button>
            </form>

            <button onclick="finishSetup()" style="width: calc(100% - 20px); padding: 10px; background-color: #007BFF; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 10px;">Finish Setting Questions</button>
            <div id="questionsList"></div>
        </div>

        <!-- Student Interface -->
        <div id="studentInterface" style="display: none;">
            <h1 style="text-align: center; color: #333;">Student Exam</h1>
            <label for="inputName" style="display: block; margin-bottom: 8px; font-weight: bold;">Name:</label>
            <input type="text" id="inputName" required style="width: calc(100% - 20px); padding: 10px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #ccc;">
            <label for="inputReg" style="display: block; margin-bottom: 8px; font-weight: bold;">Registration Number:</label>
            <input type="text" id="inputReg" required style="width: calc(100% - 20px); padding: 10px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #ccc;">
            <button onclick="startTest()" style="width: calc(100% - 20px); padding: 10px; background-color: #007BFF; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 10px;">Start Exam</button>
        </div>

        <!-- Exam Interface -->
        <div id="examScreen" style="display: none;">
            <div style="font-weight: bold; margin-bottom: 20px;">Time Left: <span id="timer">5:00</span></div>
            <form id="examForm"></form>
            <button type="button" onclick="submitTest()" style="width: calc(100% - 20px); padding: 10px; background-color: #007BFF; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 10px;">Submit</button>
        </div>

        <!-- Results Interface -->
        <div id="resultScreen" style="display: none;">
            <h2 style="text-align: center; color: #333;">Exam Results</h2>
            <p>Total Score: <span id="totalScore">0</span></p>
            <p>Percentage: <span id="percentage">0</span>%</p>
        </div>
        </div>`;
    document.getElementById('main').innerHTML=theQuestionCode;
}

function switchInterface(interfaceType) {
    document.getElementById('roleScreen').style.display = 'none';
    document.getElementById(interfaceType + 'Interface').style.display = 'block';
}

function addOption() {
    const optionText = prompt("Enter an answer option:");
    if (optionText) {
        const container = document.getElementById('optionsContainer');
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.value = optionText;
        newInput.readOnly = true;
        newInput.style.marginBottom = '5px';
        container.appendChild(newInput);
        container.appendChild(document.createElement('br'));
    }
}

function getOptions() {
    const container = document.getElementById('optionsContainer');
    const inputs = container.querySelectorAll('input[type="text"]');
    return Array.from(inputs).map(input => input.value.trim());
}

function updateQuestionFields() {
    const qType = document.getElementById('selectType').value;
    document.getElementById('sectionMC').style.display = qType === 'multiple-choice' ? 'block' : 'none';
    document.getElementById('sectionFA').style.display = qType === 'free-answer' ? 'block' : 'none';
    document.getElementById('sectionLI').style.display = qType === 'list-items' ? 'block' : 'none';
}

function saveQuestion() {
    const newQuestion = {
        text: document.getElementById('inputQuestion').value,
        image: document.getElementById('inputImage').value,
        type: document.getElementById('selectType').value,
        points: parseInt(document.getElementById('inputPoints').value),
        options: [],
        keywords: [],
        itemsRequired: 0,
        correct: null,
        models: []
    };

    switch(newQuestion.type) {
        case 'multiple-choice':
            newQuestion.options = getOptions();
            newQuestion.correct = document.getElementById('inputCorrect').value.toUpperCase();
            break;
        case 'free-answer':
            newQuestion.keywords = document.getElementById('inputKeywords').value.split(',').map(k => k.trim());
            break;
        case 'list-items':
            newQuestion.itemsRequired = parseInt(document.getElementById('inputItems').value);
            for(let i = 0; i < newQuestion.itemsRequired; i++) {
                const answer = prompt(`Enter model answer ${i+1}:`);
                if(answer) newQuestion.models.push(answer.trim());
            }
            break;
    }

    questionBank.push(newQuestion);

    const listDiv = document.getElementById('questionsList');
    listDiv.innerHTML += `<p>Q${questionBank.length}: ${newQuestion.text} | Type: ${newQuestion.type} | Points: ${newQuestion.points}</p>`;

    // Reset form
    document.getElementById('inputQuestion').value = '';
    document.getElementById('inputImage').value = '';
    document.getElementById('inputPoints').value = 1;
    document.getElementById('optionsContainer').innerHTML = '<label style="display: block; margin-bottom: 8px; font-weight: bold;">Answer Options:</label>';
    document.getElementById('inputKeywords').value = '';
    document.getElementById('inputItems').value = 1;
}

function finishSetup() {
    localStorage.setItem('savedQuestions', JSON.stringify(questionBank));
    alert('Questions saved successfully!');
    document.getElementById('teacherInterface').style.display = 'none';
    document.getElementById('roleScreen').style.display = 'block';
}

function startTest() {
    const studentName = document.getElementById('inputName').value.trim();
    const regNumber = document.getElementById('inputReg').value.trim();

    if (!studentName || !regNumber) {
        alert("Please fill in all fields");
        return;
    }

    document.getElementById('studentInterface').style.display = 'none';
    document.getElementById('examScreen').style.display = 'block';
    loadQuestions();
    startTimer(300);
}

function loadQuestions() {
    questionBank = JSON.parse(localStorage.getItem('savedQuestions')) || [];
    
    if (questionBank.length === 0) {
        alert("No questions available");
        document.getElementById('examScreen').style.display = 'none';
        document.getElementById('studentInterface').style.display = 'block';
        return;
    }

    const form = document.getElementById('examForm');
    form.innerHTML = '';

    questionBank.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.style.marginBottom = '15px';
        
        let imageHTML = q.image ? `<img src="${q.image}" style="max-width: 100%; height: auto; margin-bottom: 10px;">` : '';
        let inputHTML = '';

        switch(q.type) {
            case 'multiple-choice':
                inputHTML = q.options.map((opt, i) => `
                    <label style="display: block; margin-bottom: 5px;">
                        <input type="radio" name="q${index}" value="${opt.toUpperCase()}"> ${opt}
                    </label>
                `).join('');
                break;
            case 'free-answer':
                inputHTML = `<textarea name="q${index}" rows="3" style="width: calc(100% - 20px); padding: 10px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #ccc;"></textarea>`;
                break;
            case 'list-items':
                inputHTML = Array.from({length: q.itemsRequired}, (_, i) => `
                    <div style="margin: 5px 0;">
                        <input type="text" name="q${index}_item_${i}" placeholder="Item ${i+1}" style="width: calc(100% - 20px); padding: 10px; margin-bottom: 15px; border-radius: 4px; border: 1px solid #ccc;">
                    </div>
                `).join('');
                break;
        }

        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.text}</p>
            ${imageHTML}
            ${inputHTML}
        `;
        form.appendChild(questionDiv);
    });
}

function startTimer(seconds) {
    let timeLeft = seconds;
    const timerElement = document.getElementById('timer');

    timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            submitTest();
        }
    }, 1000);
}

function submitTest() {
    clearInterval(timer);
    let score = 0;

    questionBank.forEach((q, index) => {
        let questionScore = 0;

        switch(q.type) {
            case 'multiple-choice':
                const selected = document.querySelector(`input[name='q${index}']:checked`);
                if (selected && selected.value === q.correct) {
                    questionScore = q.points;
                }
                break;
            case 'free-answer':
                const answer = document.querySelector(`textarea[name='q${index}']`).value.toLowerCase();
                const matches = q.keywords.filter(kw => answer.includes(kw.toLowerCase()));
                questionScore = (matches.length / q.keywords.length) * q.points;
                break;
            case 'list-items':
                const items = Array.from(document.querySelectorAll(`input[name^='q${index}_item_']`))
                    .map(input => input.value.trim())
                    .filter(item => item);
                questionScore = Math.min(items.length, q.itemsRequired) * (q.points / q.itemsRequired);
                break;
        }

        score += questionScore;
    });

    const totalPossible = questionBank.reduce((sum, q) => sum + q.points, 0);
    const percentage = (score / totalPossible) * 100;

    document.getElementById('examScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'block';
    document.getElementById('totalScore').textContent = score.toFixed(1);
    document.getElementById('percentage').textContent = percentage.toFixed(2);
}