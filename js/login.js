// 1. Seleccionar elementos del DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePassword');

// --- PARTE 1: para mostrar y ocultar la contraseña ---
togglePasswordButton.addEventListener('click', function() {
    // Verificamos el tipo actual del input
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Icono del ojo
    const icon = this.querySelector('i');
    icon.classList.toggle('bi-eye');
    icon.classList.toggle('bi-eye-slash');
});

// --- PARTE 2: CAPTURAR EL FORMS ---
loginForm.addEventListener('submit', function(event) {
    // Que la pag no recargue pa que no se nos vaya la info
    event.preventDefault();

    // Capturamos los valores reales
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    const keepLogged = document.getElementById('keepLogged').checked;

    // Validación
    if (emailValue === "" || passwordValue === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Procesar datos que por ahora son en al console
    console.log("--- Intento de Login ---");
    console.log("Email:", emailValue);
    console.log("Password:", passwordValue);
    console.log("Mantener sesión:", keepLogged);

    alert("¡Bienvenido de nuevo a CoWork Hub!");
    
    // Podrías redirigir al dashboard así:
    // window.location.href = "dashboard.html";
});