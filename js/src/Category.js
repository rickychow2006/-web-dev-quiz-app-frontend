class Category {

    static allCategories = [];

    constructor(name) {
        this.name = name;
        this.renderCategory();
        this.constructor.allCategories.push(this);
    }
    
    renderCategory = () => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-btn m-4';
        categoryDiv.innerHTML = `
           <button type="button" class="btn btn-outline-secondary" style="width: 100%;">${this.name}</button>
        `;    
        containerDiv.appendChild(categoryDiv);
    }   
}
