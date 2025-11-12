document.addEventListener('DOMContentLoaded', () => {

// DOM ELEMENTS

const productsDomElements = document.querySelector('.products-grid');
const inputSearch = document.querySelector('.search-products');
const categoryChecks = document.querySelectorAll('input[name="opciones"]');

const airtableToken = "patEMLyHsUiJ6GlGP.9ca1231702977e26c8c770b44e34250e834adaa4977d3d5d043af524da71d6cc";
const baseId = "appOdWK5dFP6gQQh9";
const tableName = "tblQjRt2noWsTKvzS";
const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;
let listProducts = [];


//------------------ FUNCIONES ---------------------//


/*
function filterProducts(text){
    const productsFiltered = listProducts.filter (product => product.name.toLowerCase().includes(text.toLowerCase()));
    return productsFiltered;
}

function filterProductsByCategory(category){
    const checkedBox = document.querySelector(`input[value="${category}"]`);
    if(checkedBox.lenght === 0) {
        return listProducts;
    }
    const selectedCategory = checkedBox.value;
} */ 

// filtros combinados

function filtersCombined() {
    const productsFiltered = listProducts.filter(product => {
        product.name.toLowerCase().includes(filter.text.toLowerCase()) &&
        product.category.toLowerCase().includes(filter.category.toLowerCase());
    });
    return productsFiltered;
}

// inicializar productos

function renderProducts(products){
    productsDomElements.innerHTML = '';
    products.forEach( product => {
        const newProduct = createProduct(product);
        productsDomElements.appendChild(newProduct);
    });
}

// crear producto
function createProduct(product) {
    const newProduct = document.createElement('div');
    newProduct.setAttribute("class", "product-item");

    const newAnchor = document.createElement('a');
    newAnchor.href = "/product-details.html";
    //?code=${encodeURIComponent(product.id)}`; 

    const newImage = document.createElement('img');
    newImage.setAttribute("src", product.img);
    newImage.setAttribute("alt", product.imgAlt);

    const newProductName = document.createElement('p');
    newProductName.textContent = product.name;

    const newProductPrice = document.createElement('span');
    newProductPrice.innerText = `$${product.price}`;

    newAnchor.append(newImage, newProductName, newProductPrice);
    newProduct.appendChild(newAnchor);

    return newProduct;

}

// ------------------ EVENTOS ------------------ //

inputSearch.addEventListener('keyup', (event) => {
    const text = event.target.value;
    const productsFiltered = filtersCombined({text: text, category: filter.category});
    renderProducts(productsFiltered);
});

categoryChecks.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
    renderProducts(productsFiltered);
    });
});




});