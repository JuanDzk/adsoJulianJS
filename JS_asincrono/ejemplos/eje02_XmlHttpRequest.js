function ajax() {
    //Se crea objeto FormData para representar datos de Formulario
    let data = new FormData();
    data.append('num1', 3); //Se agrega un dato al formulario
    data.append('num2', 8); //Se agrega un dato al formulario
    
    let xhr = new XMLHttpRequest();
    const url = 'operacion.php';

    xhr.onreadystatechange = function (){
        //se valida con el readystate y status de la peticion
        //readystate: 4 = peticion completa y respuesta lista
        //status: 200 = peticion exitosa
        if (xhr.readyState ==4 && xhr.status == 200) {
            console.log('Estado>' + xhr.readyState+ '-Status> '+ xhr.status);
            console.log(xhr.responseText);

        }else {
            console.log('Estado>' + xhr.readyState+ '-Status> '+ xhr.status); 
        }
    };
    xhr.open('POST', url, true);//Se abre la conexión 
    xhr.send(data);//Se envia la peticion
    }
    ajax();