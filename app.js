// creo los elementos
const newProduct = document.createElement('div');
newProduct.setAttribute("class", "product-item");

const newAnchor = document.createElement('a');
newAnchor.setAttribute("href", "/product-detail.html");

const newImage = document.createElement('img');
newImage.setAttribute("src", "./img/item-gomitas.jpg");
newImage.setAttribute("alt", "producto nuevo");

const newProductName = document.createElement('p');
newProductName.textContent = "Producto nuevo";

const newProductPrice = document.createElement('span');
newProductPrice.textContent = "$Precio";

// estructura
newProduct.appendChild(newAnchor);
newAnchor.appendChild(newImage);
newProduct.appendChild(newProductName);
newProduct.appendChild(newProductPrice);

// agrego el contenido nuevo al dom 
const productsContainer = document.querySelector('.products-grid'); // elemento padre
productsContainer.appendChild(newProduct); 


