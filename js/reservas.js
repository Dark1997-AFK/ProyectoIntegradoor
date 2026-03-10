// 1. Seleccionamos el formulario
const reservationForm = document.getElementById('reservationForm');

// 2. Escuchamos el evento de envío
reservationForm.addEventListener('submit', function(event) {
    // Evitamos que la página se recargue automáticamente
    event.preventDefault();

    // 3. Capturamos todos los valores usando los IDs de tu HTML
    const reserva = {
        nombre: document.getElementById('resName').value,
        email: document.getElementById('resEmail').value,
        telefono: document.getElementById('resPhone').value,
        espacio: document.getElementById('roomType').value,
        fecha: document.getElementById('resDate').value,
        personas: document.getElementById('resPeople').value,
        horaInicio: document.getElementById('startTime').value,
        horaFin: document.getElementById('endTime').value
    };

    // 4. Validación de Lógica de Tiempo
    // Comparamos si la hora de inicio es mayor o igual a la de fin
    if (reserva.horaInicio >= reserva.horaFin) {
        alert("Error: La hora de finalización debe ser posterior a la hora de inicio.");
        return; // Detenemos la ejecución aquí
    }

    // 5. Simulación de envío exitoso
    console.log("Nueva Reserva Recibida:", reserva);

    // Mostramos un mensaje elegante al usuario
    alert(`¡Reserva Exitosa!\n\nHola ${reserva.nombre}, tu ${reserva.espacio} ha sido reservado para el día ${reserva.fecha}.`);

    // 6. Limpiamos el formulario para una nueva reserva
    reservationForm.reset();
});