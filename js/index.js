const userApi = new apiUser('https://web-dev-quiz-app-backend.herokuapp.com/api/users');

const header = document.getElementById('header');
const userForm = document.querySelector('.input-group');
const loginBtn = document.getElementById('login-btn');
const userNote = document.querySelector('.user-note');
const playBtn = document.getElementById('play');
const containerDiv = document.querySelector('.container');

let currentCategory = '';

playBtn.addEventListener('click', () => {
    containerDiv.innerHTML = '';
    const infoDiv = document.createElement('div')
        infoDiv.className = 'position-relative'
        infoDiv.innerHTML = `<div class =" text-center m-3 border-bottom"">
        <h3> Some Rules of this Quiz </h3> </div>
        <div class="info-list">
        <div class="info m-3"> 1. Once you select your answer, it can't be undone. </div>
        <div class="info m-3"> 2. You can't exit from the Quiz while you're playing. </div>
        <div class="info m-3 border-bottom "> 3. You'll get points on the basis of your correct answers. <br> <br> </div> </div>
        <div class="btn float-end">
            <button class="exit_btn btn btn-outline-secondary"> Exit </button>
            <button class="continue_btn btn btn-outline-secondary"> Continue </button>
        </div>`
        containerDiv.appendChild(infoDiv);

        const exitBtn = document.querySelector('.exit_btn')
        const continueBtn = document.querySelector('.continue_btn')

        exitBtn.addEventListener('click', () => {
        window.location.reload()
        })

        continueBtn.addEventListener('click', () => {
            containerDiv.innerHTML = `
            <div class =" text-center m-3 border-bottom">
            <h3>Select Category</h3> </div>`;
            getCategories = () => fetch(`https://web-dev-quiz-app-backend.herokuapp.com/api/v1/categories`).then(resp => resp.json())
            getCategories()
                .then(categories => categories.data.forEach(category => new Category(category.attributes.name)))
                .catch(error => alert(error));
        })
})

User.getAllUsers();

userForm.addEventListener('click', (event) => {
    if (event.target.innerHTML === "Log In") User.checkUserLogin();
    if (event.target.innerHTML === "Sign Up") User.userSignup();
})

Question.init();
Question.startGame();
