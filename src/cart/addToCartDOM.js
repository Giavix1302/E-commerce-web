import { formatPrice, getElement } from "../utils.js";

const cartListDOM = getElement('.cart-list');

const addToCartDOM = ({id, title, price, image, amount, category}) => {
    const article = document.createElement('article');
    article.classList.add('cart-item');
    article.setAttribute('data-id', id);
    article.innerHTML = `
        <div class="cart-item-info">
            <img src="${image}" alt="" class="cart-item-image">
            <div class="cart-wrap-info">
                <h5 class="cart-item-name line-clamp">${title}</h5>
                <p class="cart-item-cate">${category}</p>
                <button class="cart-item-remove" data-id="${id}">Remove</button>
            </div>
        </div>
        <div class="cart-item-quatity">
            <button class="cart-item-quatity-decrease" data-id="${id}">
                <i class="fa-solid fa-minus"></i>
            </button>
            <span class="cart-item-quatity-num" data-id="${id}">${amount}</span>
            <button class="cart-item-quatity-increase" data-id="${id}">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        <span class="cart-item-price">${formatPrice(price)}</span>
        <span class="cart-item-total" data-id="${id}">${formatPrice(price * amount)}</span>
    `;
    cartListDOM.appendChild(article);
};

export default addToCartDOM;