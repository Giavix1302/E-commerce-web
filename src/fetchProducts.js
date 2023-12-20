import { productsURL } from './utils.js';

const fetchProduct = async () => {
    const response = await fetch(productsURL).catch((error) => {
        console.log(error);
    })
    if(response) {
        return response.json();
    }
    return response;
}

export default fetchProduct;