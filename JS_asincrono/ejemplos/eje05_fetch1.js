let myForm = document.getElementById('myForm');
myForm.addEventListener('submit', fetchData);
function fetchData(event) {
    //Evita que se envie el formulario
    event.preventDefault();
    const url='procesarDatosUsuario.php';
    //Obtenemos los datos del formulario
    const formData = new FormData(myForm);
    // se realiza la peticion con fecth
    fetch(url, {
        method: 'POST', //se envian datos por post
        body: formData // se envian datos formulario
    })
    .then((resp) => {
        if (resp.ok) {
            //devuelve una promesa con el texto de la respuesta
            return resp.text();
            
        }
    })
    .then(data=>{
        document.getElementById('resultado').innerHTML = data;
        document.getElementById('resultado').style.display = 'block';
        myForm.reset();

    })
    .catch(error => console.error("Error", error));
    
}