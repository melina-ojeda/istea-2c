const products = document.getElementById('products-container'); // elemento padre

// creo los elementos
const newProduct = document.createElement('div');
newProduct-setAtribute("class", "product-item")

const newAnchor = document.createElement('a');
newAnchor.setAttribute("href", "/product-detail.html");

const newDiv = document.createElement('div');
newDiv.setAttribute("class", "product-image");

// agrego el contenido nuevo al dom 
products.appendChild(newProduct); 
