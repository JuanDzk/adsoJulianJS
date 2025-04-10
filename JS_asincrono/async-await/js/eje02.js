(async function(){
    try {
        let pais = await infoCountry("co");
        console.log(pais);
        
        pais = pais[0];
        const country = document.querySelector(".country");
        const boton = document.getElementById("btn_enviar");

        boton.addEventListener("click", async () => {

            const cod = document.getElementById("txtPais").value.trim().toLowerCase();

            country.innerHTML = "";

            if (cod === "") {
                country.innerHTML = `<p class="error">Ingresa un codigo valido.</p>`;
                return;
            }

            try {
                let pais = await infoCountry(cod);
                pais = pais[0];

                country.innerHTML = `
                    <div class="country-content">
                        <h2>País</h2>
                        <span>${pais.name.common}</span>
                    </div>
                    <div class="country-content">
                        <h2>Capital</h2>
                        <span>${pais.capital}</span>
                    </div>
                    <div class="country-content">
                        <h2>Población</h2>
                        <span>${pais.population}</span>
                    </div>
                    <div class="country-content">
                        <h2>Región</h2>
                        <span>${pais.region}</span>
                    </div>
                    <div class="country-content">
                        <h2>Continente</h2>
                        <span>${pais.continents[0]}</span>
                    </div>`;
            } catch (error) {
                country.innerHTML = `<p class="error">No se pudo obtener información. Verifica el código ingresado.</p>`;
                console.error(error);
            }
        });

        // Muestra un país por defecto al iniciar (Colombia)
        country.innerHTML =`
            <div class="country-content">
                <h2>País</h2>
                <span>---</span>
            </div>
            <div class="country-content">
                <h2>Capital</h2>
                <span>---</span>
            </div>
            <div class="country-content">
                <h2>Población</h2>
                <span>---</span>
            </div>
            <div class="country-content">
                <h2>Región</h2>
                <span>---</span>
            </div>
            <div class="country-content">
                <h2>Continente</h2>
                <span>---</span>
            </div>`;
    } catch (error) {
        throw new Error(`ERROR ${error}`);        
    }
})();

async function infoCountry(codeCountry) {
    const url = `https://restcountries.com/v3.1/alpha/${codeCountry}`;
    const resp = await fetch(url);

    if (resp.ok && resp.status === 200) {
        const data = await resp.json();
        return data;
    } else {
        throw new Error("ERROR llamado de API");
    }
}
