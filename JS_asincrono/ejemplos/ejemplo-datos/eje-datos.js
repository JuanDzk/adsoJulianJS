let selectDatos = document.querySelector("#slDatos");
const url = "https://www.datos.gov.co/resource/ii2p-naes.json";
let allData = []; // Almacena los datos globalmente

selectDatos.addEventListener("change", infoMilitar);

function setDatos() {
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            allData = data; 
            const zonasUnicas = [...new Set(data.map(item => item.zona))].sort(); //
            selectDatos.innerHTML = `<option value="">Seleccione una zona</option>` + 
                zonasUnicas.map(zona => `<option value="${zona}">${zona}</option>`).join();
        })
        .catch(error => console.error("Error cargando datos:", error));
}

function infoMilitar() {
    let zonaSeleccionada = this.value;
    let cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; 

    if (!zonaSeleccionada) return;

    const datosFiltrados = allData.filter(item => item.zona === zonaSeleccionada);

    datosFiltrados.forEach(item => {
        let card = document.createElement("div");
        card.classList.add("col-md-3");
        card.innerHTML = `
            <div class="card p-3 shadow">
                <div class="card-body">
                    <h5 class="card-title">${item.ciudad || "N/A"}</h5>
                    <p class="card-text">${item.direccion || "N/A"}</p>
                </div>
            </div>
        `;
        card.addEventListener("click", () => abrirModal(item));
        cardContainer.appendChild(card);
    });
}

let map = null; // Variable global para almacenar el mapa

function abrirModal(item) {
    document.getElementById("modal-zona").textContent = item.zona || "N/A";
    document.getElementById("modal-zona-dim").textContent = item.zona_dim || "N/A";
    document.getElementById("modal-direccion").textContent = item.direccion || "N/A";
    document.getElementById("modal-ciudad").textContent = item.ciudad || "N/A";
    document.getElementById("modal-telefono").textContent = item.telefono || "N/A";
    document.getElementById("modal-latitude").textContent = item.location?.latitude || "N/A";
    document.getElementById("modal-longitude").textContent = item.location?.longitude || "N/A";
    document.getElementById("modal-correo").textContent = item.correo_electronico || "N/A";

    let lat = parseFloat(item.location?.latitude);
    let lon = parseFloat(item.location?.longitude);

    // Verificar si las coordenadas son válidas
    if (!isNaN(lat) && !isNaN(lon)) {
        setTimeout(() => {
            // Si ya hay un mapa, se destruye antes de crear uno nuevo
            if (map) {
                map.remove(); // Elimina el mapa anterior
            }

            map = L.map('map').setView([lat, lon], 13); // Crear nuevo mapa

            // Cargar mapa base de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'  
            }).addTo(map);

            // Agregar marcador
            L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>${item.ciudad || "Ubicación"}</b><br>${item.direccion || "Dirección desconocida"}`)
                .openPopup();
        }, 300);
    }

    let modal = new bootstrap.Modal(document.getElementById("infoModal"));
    modal.show();
}



setDatos();
