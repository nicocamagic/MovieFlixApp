const API_KEY = "65828ad8466854fb79cfd910b96d1b02";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

// Obtener películas por categoría
async function fetchMovies(category) {
    const res = await fetch(`${BASE_URL}movie/${category}?api_key=${API_KEY}&language=es`);
    const data = await res.json();
    displayMovies(data.results);
}

// Mostrar películas y hacerlas clickeables para ver el tráiler
function displayMovies(movies) {
    const container = document.getElementById("movies-container");
    container.innerHTML = movies.map(movie => `
        <div class="movie" onclick="fetchTrailer(${movie.id})">
            <img src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        </div>
    `).join('');
}

// Obtener y mostrar el tráiler de la película seleccionada
async function fetchTrailer(movieId) {
    const res = await fetch(`${BASE_URL}movie/${movieId}/videos?api_key=${API_KEY}&language=es`);
    const data = await res.json();
    
    const trailer = data.results.find(video => video.type === "Trailer");
    if (trailer) {
        showTrailer(trailer.key);
    } else {
        alert("No hay tráiler disponible para esta película.");
    }
}

// Mostrar tráiler en modal
function showTrailer(videoKey) {
    const modal = document.getElementById("trailer-modal");
    const iframe = document.getElementById("trailer-video");

    iframe.src = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;
    modal.style.display = "flex";
}

// Cerrar el modal del tráiler
function closeTrailer() {
    const modal = document.getElementById("trailer-modal");
    const iframe = document.getElementById("trailer-video");

    iframe.src = "";
    modal.style.display = "none";
}

// Buscador de películas
document.getElementById("search").addEventListener("input", async (e) => {
    const query = e.target.value;
    if (query.length > 2) {
        const res = await fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&language=es&query=${query}`);
        const data = await res.json();
        displayMovies(data.results);
    } else {
        fetchMovies("popular");
    }
});

// Obtener información del usuario desde Firebase
function getUserProfile() {
    const user = JSON.parse(localStorage.getItem("user")); // Suponiendo que guardaste los datos en localStorage
    const container = document.getElementById("movies-container");

    if (user) {
        container.innerHTML = `
            <div class="profile">
                <h2>Perfil</h2>
                <p><strong>Nombre:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <button onclick="logout()">Cerrar Sesión</button>
            </div>
        `;
    } else {
        container.innerHTML = `<p>No hay usuario registrado. <a href="registro.html">Regístrate aquí</a></p>`;
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem("user");
    window.location.href = "registro.html";
}

// Filtrar películas al hacer clic en los botones del menú
document.getElementById("menu-inicio").addEventListener("click", () => fetchMovies("popular"));
document.getElementById("menu-buscar").addEventListener("click", () => fetchMovies("now_playing"));
document.getElementById("menu-favoritos").addEventListener("click", () => fetchMovies("top_rated"));
document.getElementById("menu-perfil").addEventListener("click", getUserProfile);

// Cargar películas populares al inicio
fetchMovies("popular");
