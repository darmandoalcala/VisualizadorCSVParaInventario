
const selectDispositivo = document.getElementById('disp');
const imagenDispositivo = document.querySelector('#disp-lateral-form img');
const basePath = 'img/disp/';
const defaultImage = basePath + 'DEFAULT.png';

function actualizarImagen() {
    const valorSeleccionado = selectDispositivo.value;
    let nuevaRuta;

    if (valorSeleccionado === 'OTRO' || !valorSeleccionado) {
        nuevaRuta = defaultImage;
    } 
    else {
        nuevaRuta = basePath + valorSeleccionado + '.png';
    }
    imagenDispositivo.src = nuevaRuta;
}

function setFechaRevisadoActual() {
    const inputFechaRevisado = document.getElementById('fecha-revisado');
    const hoy = new Date();

    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    const fechaFormateada = `${año}-${mes}-${dia}`;
    inputFechaRevisado.value = fechaFormateada;
}

function concatenarLugarDpto(event) {
    const form = event.target;
    const sucursalInput = form.querySelector('#lugar_base');
    const dptoInput = form.querySelector('#dpto_base');

    if (!sucursalInput || !dptoInput) return;
    
    const sucursalValue = sucursalInput.value.trim().toUpperCase();
    const dptoValue = dptoInput.value.trim().toUpperCase();
    
    // Crea el valor final concatenado: GP-LUGAR/DPTO
    const lugarDptoConcatenado = `GP-${sucursalValue}/${dptoValue}`;

    let hiddenLugarInput = form.querySelector('input[name="lugar"]');
    
    if (!hiddenLugarInput) {
        hiddenLugarInput = document.createElement('input');
        hiddenLugarInput.type = 'hidden';
        hiddenLugarInput.name = 'lugar_dpto';
        form.appendChild(hiddenLugarInput);
    }

    hiddenLugarInput.value = lugarDptoConcatenado;
}

setFechaRevisadoActual();

selectDispositivo.addEventListener('change', actualizarImagen);
setTimeout(actualizarImagen, 100); 


document.addEventListener('DOMContentLoaded', function() {
// Inicialización de constantes dentro del ámbito
const selectDispositivo = document.getElementById('disp');

setFechaRevisadoActual();

selectDispositivo.addEventListener('change', actualizarImagen);

setTimeout(actualizarImagen, 100); 

});