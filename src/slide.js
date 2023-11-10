import { getElement, productsURL, productURL } from "./utils.js";

const featuredList = getElement('.featured__list');

let listFeatured = [];

const getData = async () => {
    try {
        const response = await fetch(productsURL);
        const data = await response.json();
        if(response.status >= 200 && response.status <= 299) {
            return data;
        } else {
            console.log('Server Error');
        }
    } catch (error) {
        console.log('Error', error);
    }
}


const data = await getData()
data.forEach((item) => {
    const { id, title, price, description: desc, image } = item;
    const { rate } = item.rating; 
    if(rate > 4) {
        const itemFeatured = { id, title, price, desc, image, rate };
        listFeatured = [ ...listFeatured, itemFeatured];
    }
})

featuredList.innerHTML = listFeatured.map((item, slideIndex) => {
    const { id, title, price, desc, image, rate } = item;
    let position = 'next';
    if (slideIndex === 0) {
        position = 'active';
    }
    if (slideIndex === listFeatured.length - 1) {
        position = 'last';
    }
    return `<article class="featured__item ${position}" data-id=${id}>
        <img src="${image}" alt="" class="featured__item-img">
        <div class="featuerd__item-info">
            <div class="featured__item-wrap-heading">
                <h4 class="featured__item-title">${title}</h4>
                <div class="featured__item-rate">
                    <img src="./assets/icon/star.png" alt="" class="featured__item-icon-star">
                    <span class="featured__item-num-rate">${rate}</span>
                </div>
            </div>
            <p class="featured__item-desc line-clamp">${desc}</p>
            
            <div class="featured__item-wrap-footer">
                <p class="featured__item-price">${price}</p>
                <button class="featured__item-btn">
                        <a href="" class="featured__item-link">Detail</a>
                </button>
            </div>
        </div>
    </article>`
}).join('');

const startSlide = () => {
    const active = getElement('.active');
    const last = getElement('.last');
    let next = active.nextElementSibling;
    if(!next) next = featuredList.firstElementChild;
    active.classList.remove('active');
    last.classList.remove('last');
    next.classList.remove('next');

    active.classList.add('last');
    last.classList.add('next');
    next.classList.add('active');
}

setInterval(() => {
    startSlide();
}, 2000)
// startSlide();