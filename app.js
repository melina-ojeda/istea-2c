const listProducts = [
    {name: "Gomitas de colágeno", price: 1500, img: "img/item-gomitas.jpg", imgAlt: "gomitas de colágeno"},
    {name: "Sticks anti-sarro", price: 1500, img: "img/item-snacksaliento.jpg", imgAlt: "sticks anti-sarro"},
    {name: "Helados", price: 1500, img: "img/item-helados.jpg", imgAlt: "helados"},
    {name: "Snacks para gatos", price: 2000, img: "img/item-snacksgatos.jpg", imgAlt: "snacks para perros"},
];

// DOM ELEMENTS

const productsDomElements = document.querySelector('.products-grid');
const inputSearch = document.querySelector('.search-products');

// FUNCIONES 
function createProduct(product) {

// creo los elementos
const newProduct = document.createElement('div');
newProduct.setAttribute("class", "product-item");

const newAnchor = document.createElement('a');
newAnchor.setAttribute("href", "/product-detail.html");

const newImage = document.createElement('img');
newImage.setAttribute("src", product.img);
newImage.setAttribute("alt", product.imgAlt);

const newProductName = document.createElement('p');
newProductName.textContent = product.name;

const newProductPrice = document.createElement('span');
newProductPrice.innerText = `$${product.price}`;

// estructura
newProduct.appendChild(newAnchor);
newAnchor.appendChild(newImage);
newProduct.appendChild(newProductName);
newProduct.appendChild(newProductPrice);

return newProduct;

}

function filterProducts(text){
    const productsFiltered = listProducts.filter( product => product.name.toLowerCase().includes(text.toLowerCase()));
    return productsFiltered;
}

function renderProducts(products){
    productsDomElements.innerHTML = '';
    products.forEach( product => {
        const newProduct = createProduct(product);
        productsDomElements.appendChild(newProduct);
    });
}

function filterProductsByCategory(category){
    const checkedBox = document.querySelector(`input[value="${category}"]`);
    if(checkedBox.lenght === 0) {
        return listProducts;
    }
    const selectedCategory = checkedBox.value;
}

// EVENTOS

inputSearch.addEventListener('keyup', (event) => {
    const text = event.target.value;
    const productsFiltered = filterProducts(text);
    renderProducts(productsFiltered);
});

// Inicialización

renderProducts(listProducts);



