document.getElementById("btn_enviar").addEventListener("click",ajax)

function ajax() {
    event.preventDefault();
    let formElement = document.getElementById("myForm");
    let formData = new FormData(formElement);

    const xhr = new XMLHttpRequest();
    const url = 'operacion.php';

    xhr.addEventListener('load', resultado);
    xhr.open('POST', url);
    xhr.send(formData);
}
function resultado() {
    if (this.readyState ===4) {
        if (this.status === 200) {
            // const resultado = document.getElementById('txtResult');
            // resultado.value = this.responseText;
            const resultado = document.getElementById('resultado');
            resultado.style.display = 'block';
            resultado.innerHTML = 'resultado: ' + this.responseText;
            'Resultado:' + this.responseText;
        } else {
            alert('Error en la petición');
        }
    }
}