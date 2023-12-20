import { getElement, getStorageItem, setStorageItem } from "./utils.js";
import { findProduct } from './store.js'
 
const display = (products, element, filters) => {
    element.innerHTML = products.map((product) => {
        const {id, title, category, image, rate} = product;
        return `
            <article class="product-card">
                <img src="${image}" alt="" class="product-card__image">
                <div class="product-card__info">
                    <div class="wrap-name-rate">
                        <h4 class="product-card__name">${title}</h4>
                        <div class="product-card__rate">
                            <img src="./assets/icon/star.png" alt="" class="product-card__icon-star">
                            <span class="product-card__num-rate">${rate}</span>
                        </div>
                    </div>
                    <p class="product-card__cate">${category}</p>

                    <div class="product-card__btn">
                        <a href="./productDetail.html?id=${id}" class="product-card__btn-buy">DETAIL</a>
                        <a href="#!" class="product-card__btn-cart" data-id="${id}">ADD TO CART</a>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    if(filters) return;

    element.addEventListener('click', function(e) {
        const element = e.target;
        const id = parseInt(element.dataset.id);
        if(element.classList.contains('product-card__btn-cart')) {
            let cart = getStorageItem('cart');
            let item = cart.find((itemCart) => id === itemCart.id);
            if(item) {
                cart = cart.map((cartItem) => {
                    if(cartItem.id === id) {
                        let newAmount = cartItem.amount + 1;
                        cartItem = { ...cartItem, amount: newAmount++ };
                    }
                    return cartItem;
                })
            } else {
                let product = findProduct(id);
                product = {...product, amount: 1};
                cart = [ ...cart, product];
            }
            setStorageItem('cart', cart);
        }
        location.href = '../cart.html';
    });
}

export default display;