document.addEventListener('DOMContentLoaded', () => {
    
    const airtableToken = "patEMLyHsUiJ6GlGP.9ca1231702977e26c8c770b44e34250e834adaa4977d3d5d043af524da71d6cc";
    const baseId = "appOdWK5dFP6gQQh9";
    const tableName = "tblQjRt2noWsTKvzS";
    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    const modal = document.getElementById('modal-container');
    const btnOpenModal = document.getElementById('btn-create-product');
    const createForm = document.getElementById('create-product-form');
    let allProducts = [];
    let editProductId = null;

    const tableBody = document.getElementById('admin-table-body');
    const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

    // obtengo los datos
    async function fetchProducts() {
        try {
            const response = await fetch(airtableUrl, {
                headers: {
                    Authorization: `Bearer ${airtableToken}`
                }
            });
            
            if (!response.ok) throw new Error('Error al conectar con Airtable: ' + response.statusText);
            
            const data = await response.json();
            allProducts = data.records;
            renderAdminTable(data.records); 

        } catch (error) {
            console.error(error);
            alert('Hubo un error al cargar los productos.');
        }
    }

    // pinto la tabla
    function renderAdminTable(products) {
        let rowsHTML = '';

        products.forEach(record => {
            const item = record.fields; 
            const id = record.id; 

            rowsHTML += `
                <tr>
                    <td data-label="Producto">
                        <div class="product-info-mini">
                            <img src="${item.img ? item.img[0].url : 'img/placeholder.jpg'}" alt="${item.name || 'Producto'}">
                            <span>${item.name || 'Sin Nombre'}</span>
                        </div>
                    </td>
                    <td data-label="Descripción" class="desc-cell">${item.description || ''}</td>
                    <td data-label="Categoría">${item.category || 'Sin categoría'}</td>
                    <td data-label="Stock">
                        <span class="${item.stock < 5 ? 'low-stock' : ''}">${item.stock || 0} u.</span>
                    </td>
                    <td data-label="Precio">${formatter.format(item.price || 0)}</td>
                    <td data-label="Acciones">
                        <div class="action-buttons">
                            <button class="btn-edit" data-id="${id}">Editar</button>
                            <button class="btn-delete" data-id="${id}">Borrar</button>
                        </div>
                    </td>
                </tr>
            `;
        });

        tableBody.innerHTML = rowsHTML;
    }

    // borrar un producto
    async function deleteProduct(id) {
        try {
            const response = await fetch(`${airtableUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${airtableToken}`
                }
            });

            if (response.ok) {
                alert('Producto eliminado correctamente');
                fetchProducts();
            } else {
                alert('No se pudo eliminar el producto');
            }

        } catch (error) {
            console.error(error);
        }
    }

    // eventos de los botones acciones
    tableBody.addEventListener('click', (e) => {
        const id = e.target.dataset.id;

        if (e.target.classList.contains('btn-delete')) {
            if(confirm('¿Seguro que quieres borrar este producto?')) {
                deleteProduct(id);
            }
        }

        if (e.target.classList.contains('btn-edit')) {
            editProductId = id;

            const productToEdit = allProducts.find(p => p.id === id);
            const item = productToEdit.fields;

            document.getElementById('new-name').value = item.name || '';
            document.getElementById('new-desc').value = item.description || '';
            document.getElementById('new-category').value = item.category || 'Perros';
            document.getElementById('new-stock').value = item.stock || 0;
            document.getElementById('new-price').value = item.price || 0;
            
            if(item.img && item.img.length > 0) {
                document.getElementById('new-img').value = item.img[0].url;
            } else {
                document.getElementById('new-img').value = '';
            }

            document.querySelector('.modal-content h2').textContent = "Editar Producto";
            
            modal.style.display = 'flex';
        }
    });

    // iniciar
    fetchProducts();

    // abrir modal
    btnOpenModal.addEventListener('click', () => {
        editProductId = null;
        createForm.reset();
        document.querySelector('.modal-content h2').textContent = "Agregar Nuevo Producto";
        document.querySelector('#create-product-form button[type="submit"]').textContent = "Guardar en Airtable";
        modal.style.display = 'flex';
    });


    // cerrar con interaccion afuera
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // crear el producto
    createForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const productData = {
            fields: {
                "name": document.getElementById('new-name').value,
                "description": document.getElementById('new-desc').value,
                "category": document.getElementById('new-category').value,
                "stock": parseInt(document.getElementById('new-stock').value),
                "price": parseFloat(document.getElementById('new-price').value),
                "img": [ { "url": document.getElementById('new-img').value } ]
            }
        };

        try {
            let response;
            
            if (editProductId) {
                // PATCH para actualizar solo los campos enviados
                response = await fetch(`${airtableUrl}/${editProductId}`, {
                    method: 'PATCH', 
                    headers: {
                        'Authorization': `Bearer ${airtableToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productData)
                });
            } else {
                // POST para crear nuevo registro
                response = await fetch(airtableUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${airtableToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productData)
                });
            }

            if (response.ok) {
                alert(editProductId ? 'Producto actualizado' : 'Producto creado');
                modal.style.display = 'none';
                fetchProducts();
            } else {
                console.error(await response.json());
                alert('Error al guardar.');
            }

        } catch (error) {
            console.error(error);
        }
    });

});