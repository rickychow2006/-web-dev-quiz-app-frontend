let currentQues = {};
let acceptAnswer = false;
let userScore = 0;
let questionCount = 0;
let availableQuestions = [];

let getQuestions = (id) => fetch(`http://localhost:3000/api/v1/categories/${id}/questions`).then(resp => resp.json())

class Question {

    static allQuestions = [];

    constructor(question, choice1, choice2, choice3, choice4, answer, category_name) {
        this.question = question;
        this.choice1 = choice1;
        this.choice2 = choice2;
        this.choice3 = choice3;
        this.choice4 = choice4;
        this.answer = answer;
        this.category_name = category_name;
        this.constructor.allQuestions.push(this);
    }

    static init() {
        for (let i = 1; i < 5; i++) {
            getQuestions(i).then(questions => questions.data.forEach(q => new Question(q.attributes.question, q.attributes.choice1, q.attributes.choice2, q.attributes.choice3, q.attributes.choice4, q.attributes.answer, q.attributes.category_name)));
        }
    }
    
    static startGame() {
        containerDiv.addEventListener('click', (event) => {
            let selectedCategory = event.target.innerHTML;

            switch (selectedCategory) {
                case 'Data Structure': 
                    currentCategory = 'data_structure';
                    this.filterQuestions('Data Structure'); 
                    this.showQuestions();   
                    break;
                case 'Computer Science':
                    currentCategory = 'computer_science';
                    this.filterQuestions('Computer Science'); 
                    this.showQuestions();  
                    break;
                case 'JavaScript':
                    currentCategory = 'javascript';
                    this.filterQuestions('JavaScript'); 
                    this.showQuestions();  
                    break;
                case 'Modern React':
                    currentCategory = 'modern_react';
                    this.filterQuestions('Modern React'); 
                    this.showQuestions();  
                    break;
            }
        })
    }
    static filterQuestions(category) {
        availableQuestions = Question.allQuestions.filter(q => q.category_name === category);
    }

    static showQuestions() {  
        containerDiv.innerHTML = '';

        if (questionCount >= 10 || availableQuestions.length < 10) {
            return
        }

        questionCount++;

        let randomIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQues = availableQuestions[randomIndex];

        let divContainer = document.createElement('div');
        divContainer.className = 'mb-3';
        divContainer.style.width = '100%';
        divContainer.innerHTML = `
            <div class='border-bottom m-3 p-2'>
                <h5> Question ${questionCount}:</h5>
                <h5> ${currentQues.question} </h5>
            </div>
            <div class='option border rounded border m-3 p-2 d-flex justify-content-between align-items-center'>
                  ${currentQues.choice1}
            </div>
            <div class='option border rounded border m-3 p-2 d-flex justify-content-between align-items-center'>
                ${currentQues.choice2}
            </div>
            <div class='option border rounded border m-3 p-2 d-flex justify-content-between align-items-center'>
                ${currentQues.choice3}
            </div>
            <div class='option border rounded border m-3 p-2 d-flex justify-content-between align-items-center'>
                ${currentQues.choice4}
            </div>
        `;

        const questionTracker = document.createElement('p');
        questionTracker.className = 'question-tracker text-muted m-3 border-top';
        questionTracker.innerHTML = `<div class="align-items-center m-3"> ${questionCount} of  10  Questions 
         </div>`;
        
        containerDiv.append(divContainer, questionTracker);

        availableQuestions.splice(randomIndex, 1);

        acceptAnswer = true;
    }
}