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
        this.checker();
    }

    static checker() {
        const selections = Array.from(document.getElementsByClassName('option'));

        selections.forEach((selection) => {
            selection.addEventListener('click', (event) => {
                if (!acceptAnswer) return;

                acceptAnswer = false;

                const userAnswer = event.target;

                const addClass = (userAnswer.innerText.trim() === currentQues.answer) ? "correct" : "incorrect";

                let tickIconTag = '<div class="que-icon"><i class="fa fa-check-circle" style="font-size:18px;color:green"></i></div>';
                let crossIconTag = '<div class="que-icon"><i class="fa fa-times-circle" style="font-size:18px;color:red" ></i></div>';

                if (addClass === "correct") {
                    userScore += 1;
                    userAnswer.classList.add("correct", "text-success")
                    userAnswer.insertAdjacentHTML("beforeend", tickIconTag);
                }

                else if (addClass === "incorrect"){
                    userAnswer.classList.add("incorrectAns", "text-danger")
                    userAnswer.insertAdjacentHTML("beforeend", crossIconTag);
                    for (let i = 0; i < selections.length; i++) {
                        if (selections[i].innerText === currentQues.answer) {
                            selections[i].classList.add("correct", "text-success" );
                            selections[i].insertAdjacentHTML("beforeend", tickIconTag);
                        }
                    }
                }

                for (let i = 0; i < selections.length; i++) {
                    selections[i].classList.add("disabled");
                }

                const continue_btn = document.createElement('div');
                continue_btn.className = `d-grid gap-2`;
                continue_btn.innerHTML = `<button class="continuebtn btn btn-outline-secondary float-end p-1 mx-3"> Next Question </button> <br>`;

                containerDiv.append(continue_btn);

                const nextBtn = document.querySelector('.continuebtn')

                nextBtn.addEventListener('click', () => {
                    setTimeout( () => {
                        this.showQuestions()
                    }, 150)
                })
            })
        })
    }
}