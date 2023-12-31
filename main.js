import './src/slide.js';
import './src/modal.js';
import './src/sideBar.js';
import { getStorageItem, getElement } from './src/utils.js';

const init = () => {
    const cart = getStorageItem('cart');
    const amountEle = getElement('.toggle-cart-count');

    const amount = cart.reduce((total, cartItem) => {
        return (total += cartItem.amount);
    }, 0);
    amountEle.textContent = amount;
   
}
init();
