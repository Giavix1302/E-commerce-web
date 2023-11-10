const productsURL = 'https://fakestoreapi.com/products';
const productURL = 'https://fakestoreapi.com/products/'

const getElement = (selection) => {
    const element = document.querySelector(selection);
    if(element) {
        return element;
    } throw new Error(`Please check "${selection}" selector, no such element exist`)
}

export { getElement, productsURL, productURL}