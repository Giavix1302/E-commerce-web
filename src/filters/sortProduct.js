import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const sort = (store) => {
    const checkboxs = document.querySelectorAll('.sort-control');

    checkboxs.forEach((checkbox) => {
        checkbox.addEventListener('click', function(e) {
            checkboxs.forEach((_checkbox) => {
                if(checkbox !== _checkbox) {
                    _checkbox.setAttribute("checked", false);
                }
            })
            const element = e.target;
            const value = element.value.split("|");
            const whatSort = value[0];
            const howSort = value[1];
            if(whatSort === "price") {
                if(howSort === "increase") {
                    store.sort((a, b) => a.price + b.price);
                } else {
                    store.sort((a, b) => a.price - b.price);
                }
            } else {
                if(howSort === "increase") {
                    store.sort((a, b) => a.rate + b.rate);
                } else {
                    store.sort((a, b) => a.rate - b.rate);
                }
            }

            display(store, getElement('.products-container'), true);
        });
    })
}

export default sort;



