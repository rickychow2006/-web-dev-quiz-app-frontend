class Category{ 
    static all = [];

    constructor(name) {
        this.name = name;
        this.renderCatgeory();
        this.constructor.all.push(this);
    }

    renderCatgeory = () => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'categorycontainer';
        categoryDiv.innerHTML = `
            <button class="button" id="play-btn""> ${this.name} </button>`;
        containerDiv.appendChild(categoryDiv);
    }
}