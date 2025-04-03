let selectDatos = document.querySelector("#slDatos");
const url = "https://www.datos.gov.co/resource/ii2p-naes.json";

selectDatos.addEventListener("change", infoMilitar);

function setDatos() {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      const zonasUnicas = [...new Set(data.map(item => item.zona))].sort();

      selectDatos.innerHTML = zonasUnicas
        .map(zona => `<option value="${zona}">${zona}</option>`)
        .join('');
    })
    .catch(error => console.error("Error cargando datos:", error));
}

function infoMilitar() {
  let zonaSeleccionada = this.value;
  
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const datosFiltrados = data.filter(item => item.zona === zonaSeleccionada);
      console.log(datosFiltrados);

      document.getElementById('tbodyMilitar').innerHTML = datosFiltrados
        .map(item => `
          <tr>
            <td>${item.zona || "N/A"}</td>
            <td>${item.zona_dim || "N/A"}</td>
            <td>${item.direccion || "N/A"}</td>
            <td>${item.ciudad || "N/A"}</td>
            <td>${item.telefono || "N/A"}</td>
            <td>${item.locacion ? `<a href="${item.locacion}" target="_blank">Ver ubicación</a>` : "N/A"}</td>
          </tr>`)
        .join('');

      new DataTable("#militar-info");
    })
    .catch(error => console.error("Error cargando datos:", error));
}

setDatos();
