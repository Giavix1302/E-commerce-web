// global imports
import '../sideBar.js';
import '../modal.js';

//filter import 
import setupSearch from '../filters/search.js';
import { displayCate, filterCate } from '../filters/category.js';
import sort from '../filters/sortProduct.js';

//specific import 
import { store, setUpstore } from '../store.js';
import paginate from '../paginate/paginate.js'
//import fetch products
import fetchProduct from '../fetchProducts.js';
import { getElement, getStorageItem } from '../utils.js';


const init = async () => {
    const loading = getElement('.loading');
    const cart = getStorageItem('cart');
    const amountEle = getElement('.toggle-cart-count');
    if(store.length < 1) {
        const products = await fetchProduct();
        setUpstore(products);
    }
    paginate();
    setupSearch(store);
    displayCate(store);
    filterCate(store);
    sort(store);

    const amount = cart.reduce((total, cartItem) => {
        return (total += cartItem.amount);
    }, 0);
    amountEle.textContent = amount;
    loading.style.display = 'none';
}

init();