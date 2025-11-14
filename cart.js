document.addEventListener('DOMContentLoaded', () => {

    const cartContainer = document.querySelector('.cart-container');
    const tableBody = document.querySelector('.cart-table tbody');
    const subtotalElement = document.querySelector('.cart-summary p b span');

    //formatear moneda
    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="cart-empty" style="text-align: center; padding: 40px 0;">
                    <h2>Tu carrito está vacío</h2>
                    <p>¡Añade productos para verlos aquí!</p>
                    <a href="/products.html" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #333; color: #fff; text-decoration: none; border-radius: 5px;">Ver productos</a>
                </div>
            `;
            return; 
        }

        let allRowsHTML = '';
        let calculatedSubtotal = 0;

        cart.forEach(item => {
            const itemSubtotal = item.price * item.quantity;
            calculatedSubtotal += itemSubtotal;

            allRowsHTML += `
                <tr class="cart-item" data-id="${item.id}">
                    <td scope="row" role="rowheader" class="product-name" data-title="Producto">
                        <div class="product-info">
                            <img src="${item.img}" alt="${item.name}">
                            <div class="product-details">
                                <a href="product-details.html?code=${item.id}">${item.name}</a>
                                <button class="btn-empty" data-id="${item.id}">Eliminar</button>
                            </div>
                        </div>
                    </td>
                    <td class="product-price" data-title="Precio">${formatter.format(item.price)}</td>
                    <td class="product-quantity" data-title="Cantidad">
                        <div class="quantity-control">
                            <button class="minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="plus" data-id="${item.id}">+</button>
                        </div>
                    </td>
                    <td class="product-subtotal" data-title="Subtotal">${formatter.format(itemSubtotal)}</td>
                </tr>
            `;
        });

        tableBody.innerHTML = allRowsHTML;
        subtotalElement.textContent = formatter.format(calculatedSubtotal);
    }

    function updateCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    tableBody.addEventListener('click', (e) => {
        const target = e.target;
        const id = target.dataset.id;

        if (!id) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (target.classList.contains('plus')) {
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex > -1) {
                cart[itemIndex].quantity++;
            }
        }

        if (target.classList.contains('minus')) {
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex > -1) {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                } else {
                    cart = cart.filter(item => item.id !== id);
                }
            }
        }

        if (target.classList.contains('btn-empty')) {
            cart = cart.filter(item => item.id !== id);
        }

        updateCart(cart);
        renderCart();
    });

    renderCart();
});