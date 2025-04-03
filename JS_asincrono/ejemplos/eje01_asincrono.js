console.log('Ejecutando eje01_asincrono.js....')

console.log('paso 1')

setTimeout(() => {
    console.log('paso 2')
},1000)

setTimeout(function() {
    console.log('paso 3')
},700)

console.log('paso 4')

//****************************************************************************//

let b;
console.log('a')
setTimeout(() => {
    b = 5 
}, 500);

console.log(b)//undefined