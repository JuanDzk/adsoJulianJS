const promise = new Promise((resolve, reject)=> {
    //Generar numero de manera aleatoria
let number = Math.floor(Math.random() * 10);

setTimeout(() => {
    if (number >5) {
        resolve(number);
    } else {
       reject('El número es menor o igual a 5'); 
    }
}, 1000);
}); 
promise
.then ( number => { console.log('Número: ' + number)})
.catch(error =>{console.error('Error:' + error)});