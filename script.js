// Importar las funciones necesarias de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD9MpjJPZyQT1G0iXVhrqug98DQYmfs8Do",
    authDomain: "api-app-45751.firebaseapp.com",
    projectId: "api-app-45751",
    storageBucket: "api-app-45751.firebasestorage.app",
    messagingSenderId: "83312667436",
    appId: "1:83312667436:web:e6944173a4eb30b90e5a89"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase inicializado correctamente:", app);

const auth = getAuth(app);  // Obtener instancia de la autenticación

// Agregar el código de login:
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener el email y la contraseña desde el formulario
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    // Intentar iniciar sesión con el email y la contraseña
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login exitoso
            const user = userCredential.user;
            console.log('Usuario logueado:', user);

            // Redirigir al usuario a la página principal o a la página que desees
            window.location.href = 'home.html';  // Cambia esta URL por la que desees
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error al iniciar sesión:', errorCode, errorMessage);

            // Si el usuario no existe, redirigir al formulario de registro
            if (errorCode === 'auth/user-not-found') {
                alert('No estás registrado. Por favor, regístrate primero.');
                window.location.href = 'registro.html';  // Cambia esta URL por tu página de registro
            }
        });
});


