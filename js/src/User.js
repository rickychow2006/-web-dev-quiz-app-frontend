let currentUser = {};

class apiUser {
    constructor(url) {
        this.url = url;
    }

    getUsers = () => fetch(`${this.url}`).then(resp => resp.json());

    postUser = (user) => {
        fetch(`${this.url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    updateScore = (currentUser) => {
        let updateCategoryScore = {}
        updateCategoryScore[`${currentCategory}_score`] = userScore;

        fetch(`${this.url}/${currentUser.id}`, {
            method: 'Path',
            headers: {
                'Conetent-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updateCategoryScore)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch( (error) => {
            console.log('Error:', error);
        });
    }
}

class User {
    
    static all = [];

    constructor(id, name, data_structure_score = 0, computer_science_score = 0, javascript_score = 0, modern_react_score = 0) {
        this.id = id;
        this.name = name;
        this.data_structure_score = data_structure_score;
        this.computer_science_score = computer_science_score;
        this.javascript_score = javascript_score;
        this.modern_react_score = modern_react_score;
        this.constructor.all.push(this);
    }

    static getAllUsers() {
        userApi.getUsers()
            .then(users => users.data.forEach(user => new User(user.attributes.id, user.attributes.name, user.attributes.data_structure_score, user.attributes.computer_science_score, user.attributes.javascript_score, user.attributes.modern_react_score)))
            .catch(error => alert(error));
    }

    static checkUserLogin() {
        const userInput = document.getElementById('user-input').value.trim();
        const userSearch = User.all.find(user => user.name === userInput);

        if (userInput === '') {
            userNote.innerHTML = `<small>Please enter your name.</small>`;
        } else if (userSearch !== undefined) {
            currentUser = userSearch;

            userNote.innerHTML = `<small>Loggin in...</small>`;

            setTimeout(function() {
                userForm.remove();
                userNote.remove();
                header.innerHTML= `
                    Welcome back, ${userSearch.name}!
                `;
            }, 1300);
        } else {
            userNote.innerHTML = `<small>User is not found.</small>`;
        }
    }

    static userSignup() {
        const userInput = document.getElementById('user-input').value.trim();
        const userSearch = User.all.find(user => user.name === userInput);
        const newUser = new User(`${User.all.length}`, `${userInput}`);

        if (userInput === '') {
            userNote.innerHTML = `<small>Please enter your name.</small>`;
        } else if (userSearch !== undefined) {
            userNote.innerHTML = `<small>User already exists. Please sign up with another name.</small>`;
        } else {
            currentUser = newUser;

            userNote.innerHTML = `<small>Saving...</small>`;

            setTimeout(function() {
                userForm.remove();
                userNote.remove();

                header.innerHTML = `
                    Welcome, ${userInput}!
                `;

                userApi.postUser(newUser);
            }, 1300);
        }
    }
}