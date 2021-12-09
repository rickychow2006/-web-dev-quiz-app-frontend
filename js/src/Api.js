class Api {
    constructor(url){
        this.url = url;
    }
}

class apiCategory extends Api { 
    getCategories = () => fetch(`${this.url}/categories`).then(resp => resp.json());
}

class apiQuestion extends Api {  
    getQuestions = (id) => fetch(`${this.url}/${id}/questions`).then(resp => resp.json());
}