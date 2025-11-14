const airtableToken = "patEMLyHsUiJ6GlGP.9ca1231702977e26c8c770b44e34250e834adaa4977d3d5d043af524da71d6cc";
const baseId = "appOdWK5dFP6gQQh9";
const tableName = "tblQblteM2cu5gtBn";
const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value;

    const data = {
        "fields": {
            "Nombre": nombre,
            "Apellido": apellido,
            "Email": email,
            "Telefono": telefono,
            "Mensaje": mensaje
        }
    };

    fetch(airtableUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${airtableToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Registro creado en Airtable', data);
        form.reset();

        const successMessage = document.querySelector('.success-message');
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 4000);
        
    })
    .catch(error => {
        console.error('Error al enviar a Airtable:', error);
        alert('Hubo un error al enviar tu mensaje. Por favor, intentalo de nuevo.');
    });
});