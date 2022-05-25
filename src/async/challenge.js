// modulo para hacer las peticiones
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


// funcion principal
const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        // instanciamos la conexion
        const xhttp = new XMLHttpRequest();
        // abrir una conexion con el metodo, la ruta y si es asincrono
        xhttp.open('GET', url_api, true);
        // validacion del llamado
        xhttp.onreadystatechange = (() => {
            // comparamos el 4 porque eso indica que se completo la peticion
            if(xhttp.readyState === 4){
                // verificamos que el status este en 200, 200 es que es correcto
                xhttp.status === 200
                    // si esta en 200
                    ? resolve(JSON.parse(xhttp.responseText))
                    // si no esta en 200
                    : reject(new Error('Error ' + url_api))
            }
        });
        // por ultimo enviamos la peticion
        xhttp.send();
    });
}

const API = 'https://rickandmortyapi.com/api/character/';


// nuestra funcion asíncrona, le devemos pasar la api
const anotherFunction = async (url_api) => {
    // el TryCatch, para que se maneje de manera sincrónica
    try {
        // esperamos que se aga la primera llamada
        const data = await fetchData(url_api);

        // esperamos que se aga la segunda llamada
        const character = await fetchData(`${API}${data.results[0].id}`)

        // esperamos que se aga la tercera llamada
        const origin = await fetchData(character.origin.url);

        // imprimimos las datos de la api
        console.log(data.info.count);
        console.log(character.name);
        console.log(origin.dimension);

    } catch (error) {
        // si hay algun error lo mostramos
        console.error(error);
    }
}

console.log('before');
// mandamos a llamar nuestra api
anotherFunction(API);
console.log('After');
