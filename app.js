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
let filter = {text: '', category: []};


//------------------ FUNCIONES ---------------------//

// filtros combinados

function filtersCombined() {
    return listProducts.filter(product => {
        const matchName = product.name.toLowerCase().includes(filter.text.toLowerCase());
        
        if (filter.category.length === 0) {
            return matchName;
        } else {
        return matchName && filter.category.includes(product.category.toLowerCase());
        }
    });
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
    newAnchor.href = `product-details.html?code=${product.id}`; 

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
        const mappedProducts = data.records.map(item => {
            const imageUrl = item.fields.img ? item.fields.img[0].url : 'img/placeholder.png';
            return{
            name: item.fields.name,
            price: item.fields.price,
            img: imageUrl,
            imgAlt: item.fields.imgAlt,
            category: item.fields.category,
            id: item.id
        }});

        listProducts = mappedProducts; 
        renderProducts(listProducts); 
    } 
    catch (error) {
        console.error('Error fetching products from Airtable:', error);
    } 
}

getProductsFromAirtable();

// ------------------ EVENTOS ------------------ //

inputSearch.addEventListener('keyup', (event) => {
    filter.text = event.target.value;
    const productsFiltered = filtersCombined();
    renderProducts(productsFiltered);
});

categoryChecks.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        filter.category = [];
        categoryChecks.forEach(check => {
            if (check.checked) {
                filter.category.push(check.value.toLowerCase());
            }
        });
        const productsFiltered = filtersCombined();
        renderProducts(productsFiltered);
    });
});
});