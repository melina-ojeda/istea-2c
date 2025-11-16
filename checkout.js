document.addEventListener('DOMContentLoaded', () => {

    const productListSummary = document.getElementById('product-list-summary');
    const subtotalElement = document.getElementById('summary-subtotal');
    const totalElement = document.getElementById('summary-total');

    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        productListSummary.innerHTML = '<p style="padding: 1rem 0;">Tu carrito está vacío.</p>';
        return;
    }

    let calculatedSubtotal = 0;
    let summaryHTML = '';

    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        calculatedSubtotal += itemSubtotal;

        summaryHTML += `
            <div class="summary-product-item">
                <div class="product-image">
                    <img src="${item.img}" alt="${item.name}">
                    <span class="product-badge">${item.quantity}</span>
                </div>
                <div class="product-details">
                    ${item.name}
                </div>
                <div class="product-price">
                    ${formatter.format(itemSubtotal)}
                </div>
            </div>
        `;
    });
    productListSummary.innerHTML = summaryHTML;
    subtotalElement.textContent = formatter.format(calculatedSubtotal);

    totalElement.textContent = formatter.format(calculatedSubtotal);

});