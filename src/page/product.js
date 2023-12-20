import '../sideBar.js';
import '../modal.js';

import { 
    getElement, 
    formatPrice, 
    getStorageItem, 
    setStorageItem, 
    productURL 
} from '../utils.js';
import { findProduct } from '../store.js'

const modelDOM = getElement('.modal-signUp');
const imgDOM = getElement('.product-detail-img');
const titleDOM = getElement('.product-detail-name');
const descDOM = getElement('.product-detail-desc');
const cateDOM = getElement('.product-detail-cate');
const priceDOM = getElement('.product-detail-price');
const btnBuyDOM = getElement('.product-detail-btn-buy');
const btnCartDOM = getElement('.product-detail-btn-cart');
const containerItem = getElement('.product-detail-container')

//cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function() {
    let urlID = window.location.search;
    urlID = urlID.slice(-1);
    containerItem.style.display = 'none';
    try {
        const response = await fetch(`${productURL}${urlID}`);
        if(response.status >= 200 && response.status <= 299) {
            const product = await response.json();
            //grab data 
            const { category, description, id, image, price, title } = product;
            titleDOM.textContent = title;
            imgDOM.src = image;
            descDOM.textContent = description;
            cateDOM.textContent = category;
            priceDOM.textContent = formatPrice(price);

            btnBuyDOM.addEventListener('click', function() {
                modelDOM.classList.add('open-modal');
            })
            btnCartDOM.addEventListener('click', function() {
                let cart = getStorageItem('cart');
                let item = cart.find((itemCart) => id === itemCart.id)
                if(item) {
                    cart = cart.map((cartItem) => {
                        if(id === cartItem.id) {
                            let newAmount = cartItem.amount +1;
                            cartItem = { ...cartItem, amount: newAmount };
                        }
                        return cartItem;
                    })
                } else {
                    let product = findProduct(id);
                    product = {...product, amount: 1};
                    cart = [ ...cart, product];
                }
                setStorageItem('cart', cart);
                location.href = '../cart.html';
            })

        }
        containerItem.style.display = 'flex';
    } catch(error) {

    }
})