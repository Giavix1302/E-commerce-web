import {
    getStorageItem,
    setStorageItem,
    formatPrice,
    getElement,
} from '../utils.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';

const cartItemCountDOM = getElement('.toggle-cart-count');
const cartItemsDOM = getElement('.cart-list');
const cartTotalDOMs = document.querySelectorAll('.num-totals');

let cart = getStorageItem('cart');
export const addToCart = (id) => {
    let item = cart.find((cartItem) => cartItem.id === id);

    if(!item) {
        let product = findProduct(id); 
        // add item to the product
        product = { ...product, amount: 1};
        cart = [ ...cart, product];
        addToCartDOM(product);
    } else {
        // update values
        const amount = increaseAmount(id);
        const items = [ ...cartItemsDOM.querySelectorAll('.cart-item-quatity-num')];
        const newAmount = items.find((value) => value.dataset.id === id);
        newAmount.textContent = amount;
    }
    //add one to the item count
    displayCartItemCount();
    // display cart totals
    displayCartTotal();
    // set cart in local storage
    setStorageItem('cart', cart);
};

function displayCartItemCount() {
    const amount = cart.reduce((total, cartItem) => {
        return (total += cartItem.amount);
    }, 0);
    cartItemCountDOM.textContent = amount;
}

function displayTotalPerItem(element) {
    const id = element.dataset.id;
    console.log(id);
    cart.forEach((cartItem) => {
        if(cartItem.id == id) {
            const total = cartItem.price * cartItem.amount;
            element.textContent = formatPrice(total);
        }
    })
}

function displayCartTotal() {
    let total = cart.reduce((total, cartItem) => {
        return (total += cartItem.price * cartItem.amount);
    }, 0);
    cartTotalDOMs.forEach((cartTotalDOM) => {
        cartTotalDOM.textContent = formatPrice(total);
    })
}

function displayCartItemDOM () {
    cart.forEach((cartItem) => {
        addToCartDOM(cartItem);
    });
}

function removeItem(id) {
    cart = cart.filter((cartItem) => {
        if(cartItem.id != id) {
            return cartItem;
        }
    });
}

function increaseAmount(id) {
    let newAmount;
    cart = cart.map((cartItem) => {
        if(cartItem.id == id) {
            newAmount = cartItem.amount + 1;
            cartItem = { ...cartItem, amount: newAmount };
        }
        return cartItem;
    })
    return newAmount;
}

function decreaseAmount(id) {
    let newAmount;
    cart = cart.map((cartItem) => {
        if(cartItem.id == id) {
            newAmount = cartItem.amount - 1;
            cartItem = { ...cartItem, amount: newAmount };
        }
        return cartItem;
    })
    return newAmount;
}

function setupCartFunctionlity() {
    cartItemsDOM.addEventListener('click', (e) => {
        const element = e.target;
        const parent = element.parentElement;
        const id = element.dataset.id;
        const parentID = parent.dataset.id;
        
        ///remove item
        if(element.classList.contains('cart-item-remove')) {
            removeItem(id);
            element.parentElement.parentElement.parentElement.remove();
        }
        // increase
        if(parent.classList.contains('cart-item-quatity-increase')) {
            const newAmount = increaseAmount(parentID);
            parent.previousElementSibling.textContent = newAmount;
            const totalItem = parent.parentElement.nextElementSibling.nextElementSibling;
            displayTotalPerItem(totalItem);
        }
        // decrease
        if(parent.classList.contains('cart-item-quatity-decrease')) {
            const newAmount = decreaseAmount(parentID);
            if(newAmount === 0) {
                removeItem(parentID);
                parent.parentElement.parentElement.remove();
            } else {
                parent.nextElementSibling.textContent = newAmount;
                const totalItem = parent.parentElement.nextElementSibling.nextElementSibling;
                displayTotalPerItem(totalItem);
            }
        }

        displayCartItemCount();
        displayCartTotal();
        setStorageItem('cart', cart);
    })
}

const init = () => {
    //display amount of cart items
    displayCartItemCount();
    //display total
    displayCartTotal();
    //add all cart items to the DOM
    displayCartItemDOM();
    //setup cart functionality
    setupCartFunctionlity();
}
init();
