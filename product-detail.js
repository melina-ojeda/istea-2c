//import { AIRTABLE_TOKEN, BASE_ID, TABLE_NAME } from './env.js';

document.addEventListener('DOMContentLoaded', () => {

  const airtableToken = "patEMLyHsUiJ6GlGP.9ca1231702977e26c8c770b44e34250e834adaa4977d3d5d043af524da71d6cc";
  const baseId = "appOdWK5dFP6gQQh9";
  const tableName = "tblQjRt2noWsTKvzS";
  const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

  function addItemMessage (msg) {
    const msgDiv = document.createElement('div');
    msgDiv.classList('.success-message');
    msgDiv.textContent(msg);

    document.body.appendChild(msgDiv);
    setTimeout() => {
      msgDiv.remove(3000);
    }
  }

  function getCodeProductFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
  }

  const productCode = getCodeProductFromURL();
  console.log('Product code from URL:', productCode);

  async function getProductDetail(code) {
    const urlProduct = `${airtableUrl}/${code}`;
    try {
        const response = await fetch(urlProduct, {
            headers: {
                'Authorization': `Bearer ${airtableToken}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const product = {
          img: data.fields.img ? data.fields.img[0].url : 'img/placeholder.png',
          imgAlt: data.fields.imgAlt || data.fields.name,
          description: data.fields.description,
          details: data.fields.details,
          name: data.fields.name,
          price: data.fields.price,
          id: data.id
        };
        console.log('Product detail from Airtable:', product);
        document.querySelector('.active-breadcrum').textContent = product.name;
        document.querySelector('.price-container h1').textContent = product.name;
        document.querySelector('.price-container h2').textContent = "$"+product.price;
        document.querySelector('.img-container img').src = product.img;
        document.querySelector('.img-container img').alt = product.imgAlt;
        document.querySelector('.product-description').textContent = product.description;
        document.querySelector('.details-list').innerText = product.details;

        const addToCart = document.querySelector('.add-to-cart-btn');
        addToCart.addEventListener('click', () => {
          const quantityInput = document.querySelector('.quantity');
          const quantity = parseInt(quantityInput.value, 10);
          const cartItem = {
              id: product.id,
              name: product.name,
              price: product.price,
              img: product.img,
              quantity: quantity
            };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        //window.location.href = 'cart.html';
        });
    } 
    catch (error) {
        console.error('Error fetching products from Airtable:', error);
    } 

    addItemMessage('¡Producto agregado al carrito!');
  }
  getProductDetail(productCode);
});
