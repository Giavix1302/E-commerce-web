import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const displayCate = (store) => {
    const catesDOM = getElement('.wrap-cate-btn');
    const listCate = [];
    store.map((item) => {
        if(!listCate.includes(item.category)) {
            listCate.push(item.category)
        }
    })
    catesDOM.innerHTML = listCate.map((cate) => {
        return `<button value="${cate}" class="categorie-btn">${cate}</button>`
    }).join('');
}

const filterCate = (store) => {
    const cateBtns = document.querySelectorAll('.categorie-btn');
    cateBtns.forEach((cateBtn) => {
        cateBtn.addEventListener('click', function(e) {
            const element = e.target;
            const value = element.getAttribute('value');
            if(value) {
                const newStore = store.filter((product) => {
                    let { category } = product;
                    if (category === value) {
                        return product;
                    }
                });
                display(newStore, getElement('.products-container'), true);
                if (newStore.length < 1) {
                    const products = getElement('.products-container');
                    products.innerHTML = `<h3 class="filter-error">sorry, no products matched your search</h3>`;
                }
            }
        })
    })
}

export { displayCate, filterCate };