const heading = document.getElementById('heading');
const loginBtn = document.getElementById('login-btn');
const playBtn = document.getElementById('play-btn');
const containerDiv = document.querySelector('.app-container');

let currentCategory = '';

playBtn.addEventListener('click', () => {
    containerDiv.innerHTML = '';
    const infoDiv = document.createElement('div')
        infoDiv.className = ''
        infoDiv.innerHTML = `
        <div class="header">
        <span> Some Rules of this Quiz </span> </div>
        </div>
        <div class="info-list">
        <div class="info"> 1. Once you select your answer, it can't be undone. </div>
        <div class="info"> 2. You can't select any option once time goes off. </div>
        <div class="info"> 3. You can't exit from the Quiz while you're playing. </div>
        <div class="info"> 4. You'll get points on the basis of your correct answers.</div> 
        </div>
        <div class="buttons">
            <button class="button"> Exit Quiz </button>
            <button class="button"> Continue </button>
        </div>`
        containerDiv.appendChild(infoDiv);

        const exitBtn = document.querySelector('.exit_btn')
        const continueBtn = document.querySelector('.continue_btn')
})