import { store } from "../store.js";
import displayBtnPag from "./displayBtnPag.js";
import setupPaginate from './setUpPaginate.js';
import { getElement } from "../utils.js";
import display from "../displayProducts.js";
 
const paginate = () => {
    const containerBtnPag = getElement('.pagination');
    
    let index = 0
    let pages = []
    
    const setupUI = () => {
        display(pages[index], getElement('.products-container'), false);
        displayBtnPag(containerBtnPag, pages, index);
    }

    pages = setupPaginate(store);
    setupUI();
    
    
    containerBtnPag.addEventListener('click', function(e) {
        if(e.target.classList.contains('pagination')) return;
        if(e.target.classList.contains('num-page')) {
            index = parseInt(e.target.dataset.index);
        }
        if(e.target.classList.contains('next-page')) {
            index++;
            if(index > pages.length - 1) {
                index = 0;
            }
        }
        if(e.target.classList.contains('prev-page')) {
            index--;
            if(index < 0) {
                index = pages.length - 1;
            }
        }
        setupUI();
    })
}

export default paginate;