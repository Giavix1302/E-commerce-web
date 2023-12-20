import '../sideBar.js';
import '../modal.js';
import { getStorageItem } from '../utils.js';
import { getElement } from '../utils.js';

const init = () => {
    const cart = getStorageItem('cart');
    const amountEle = getElement('.toggle-cart-count');

    const amount = cart.reduce((total, cartItem) => {
        return (total += cartItem.amount);
    }, 0);
    amountEle.textContent = amount;
   
}
init();