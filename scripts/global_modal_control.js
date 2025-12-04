const BRAND_IMAGES = {
    'LENOVO': 'img/lenovo_logo.png',
    'HP': 'img/hp_logo.png',
    'DELL': 'img/dell_logo.png',
    'ASUS': 'img/asus_logo.png',
    'MSI': 'img/msi_logo.png',
    'ACER': 'img/acer_logo.png',
    'DEFAULT': 'img/default_logo.png'
};

function calculateDaysAgo(isoDateString) {
    if (!isoDateString || typeof isoDateString !== 'string') return 'SIN REGISTRO';

    const reviewDate = new Date(isoDateString);
    
    if (isNaN(reviewDate.getTime())) return 'FECHA INVÁLIDA'; 

    const today = new Date();
    reviewDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const timeDiff = today.getTime() - reviewDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff === 0) return 'HOY';
    if (daysDiff === 1) return '1 DÍA';
    if (daysDiff < 0) return 'FUTURO';
    return `${daysDiff} DÍAS`;
}

function closeGlobalModal() {
    const modal = document.getElementById('itemModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function initializeGlobalModalListeners() {
    const modal = document.getElementById('itemModal');
    if (!modal) return;

    const closeButton = modal.querySelector('.close-button');

    closeButton.addEventListener('click', closeGlobalModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeGlobalModal();
        }
    });
}

/**
 * @param {Object} data - Objeto JSON del registro del equipo.
 */


function showGlobalModal(data) {
    const modal = document.getElementById('itemModal');
    if (!modal) return;

    const brand = String(data.MARCA || 'DEFAULT').toUpperCase();
    const imagePath = BRAND_IMAGES[brand] || BRAND_IMAGES['DEFAULT'];
    const fechaInventariado = data['FECHA REVISADO']; 
    const fechaCompra = data['FECHA COMPRA']; 
    const serialNumber = data['NUMERO DE SERIE'];

    // Llenado de Títulos e Imagen
    document.getElementById('modal-image-container').innerHTML = 
        `<img src="${imagePath}" alt="${data.MARCA} ${data.MODELO}" class="modal-device-image">`;
    document.getElementById('modal-title').textContent = 
        `${data.MARCA || 'N/A'} ${data.MODELO || 'N/A'} (${data.DISP || 'N/A'})`;
    document.getElementById('modal-subtitle').textContent = 
        `S/N: ${data['NUMERO DE SERIE'] || 'N/A'}`;
        
    // Llenado de Cuerpo de Detalles
    document.getElementById('modal-user').textContent = data.USUARIO || 'N/A';
    document.getElementById('modal-dpto').textContent = data['LUGAR_DPTO'] || 'N/A';
    document.getElementById('modal-buy-date').textContent = fechaCompra || 'DESCONOCIDO'; 
    document.getElementById('modal-buy-days-ago').textContent = calculateDaysAgo(fechaCompra);
    document.getElementById('modal-date').textContent = fechaInventariado || 'DESCONOCIDO';
    document.getElementById('modal-days-ago').textContent = calculateDaysAgo(fechaInventariado);
    document.getElementById('modal-funciona').textContent = data.FUNCIONA || 'N/A';
    document.getElementById('modal-details-content').textContent = data.DETALLES || 'SIN DETALLES';

    const editButton = document.getElementById('edit-equipo-button');
    if (editButton) {
        editButton.onclick = () => {
            handleEditRedirect(serialNumber);
        };
        editButton.disabled = false;
        editButton.style.display = 'inline-block';
    }

    modal.style.display = 'block';
}

/**
 * Maneja la redirección a la página de edición, pasando el serial.
 * @param {string} serialNumber - El número de serie del equipo a editar.
 */
function handleEditRedirect(serialNumber) {
    if (serialNumber) {
        // Cierra el modal antes de redirigir (buena práctica)
        closeGlobalModal();
        
        const editPageUrl = `editar_equipo.html?serial=${encodeURIComponent(serialNumber)}`;
        window.location.href = editPageUrl;
    } else {
        alert("Error: Número de Serie no disponible para editar.");
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetch('includes/modal_template.html') 
        .then(r => r.text())
        .then(html => document.body.insertAdjacentHTML('beforeend', html));
        
    initializeGlobalModalListeners();
});