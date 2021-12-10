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