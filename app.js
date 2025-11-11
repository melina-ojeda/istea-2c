document.addEventListener('DOMContentLoaded', () => {

// DOM ELEMENTS

const productsDomElements = document.querySelector('.products-grid');
const inputSearch = document.querySelector('.search-products');
const categoryChecks = document.querySelectorAll('input[name="opciones"]');

const airtableToken = "patEMLyHsUiJ6GlGP.9ca1231702977e26c8c770b44e34250e834adaa4977d3d5d043af524da71d6cc";
const baseId = "appOdWK5dFP6gQQh9";
const tableName = "Products";
const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;


// FUNCIONES 
function createProduct(product) {

// creo los elementos
const newProduct = document.createElement('div');
newProduct.setAttribute("class", "product-item");

const newAnchor = document.createElement('a');
newAnchor.href = `./product-detail.html?code=${encodeURIComponent(product.id)}`;

const newImage = document.createElement('img');
newImage.setAttribute("src", product.img);
newImage.setAttribute("alt", product.imgAlt);

const newProductName = document.createElement('p');
newProductName.textContent = product.name;

const newProductPrice = document.createElement('span');
newProductPrice.innerText = `$${product.price}`;

const buttonAddToCart = document.createElement('button');
    buttonAddToCart.innerText = "Agregar al carrito";
    buttonAddToCart.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(`Agregando al carrito: ${product.name}`);
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
    });

// estructura
newDiv.append(newImf, newProductName, newProductPrice, buttonAddToCart);
newAnchor.appendChild(newDiv);
newProduct.appendChild(newAnchor);

return newProduct;

}
/*
function filterProducts(text){
    const productsFiltered = listProducts.filter (product => product.name.toLowerCase().includes(text.toLowerCase()));
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
} */ 

// funcion filtros combinados

function filtersCombined() {
    const productsFiltered = listProducts.filter(product => {
        product.name.toLowerCase().includes(filter.text.toLowerCase()) &&
        product.category.toLowerCase().includes(filter.category.toLowerCase());
    });
    return productsFiltered;
}

function renderProducts(products){
    productsDomElements.innerHTML = '';
    products.forEach( product => {
        const newProduct = createProduct(product);
        productsDomElements.appendChild(newProduct);
    });
}

// EVENTOS

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

// Inicialización

//renderProducts(listProducts);


async function getProductsFromAirtable() {
    try {
        const response = await fetch(airtableUrl, {
            headers: {
                'Authorization': `Bearer ${airtableToken}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('products from Airtable:', data);
        const mappedProducts = data.records.map(item => ({
            name: item.fields.name,
            price: item.fields.price,
            img: product.image,
            imgAlt: item.fields.imageAlt,
            category: item.fields.category
        }));
    } 
    catch (error) {
        console.error('Error fetching products from Airtable:', error);
    } 
}

getProductsFromAirtable();

});