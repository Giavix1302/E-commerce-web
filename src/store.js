import { getStorageItem, setStorageItem } from './utils.js'

let store = getStorageItem('store');
const setUpstore = (products) => {
    store = products.map((product) => {
        const {id , title, price, description, category, image, rating: { rate },} = product;
        return {id , title, price, description, category, image, rate};
    });
    setStorageItem('store', store);
};

const findProduct = (id) => {
    let product = store.find((product) => product.id === id);
    return product;
}

export { store, setUpstore, findProduct };