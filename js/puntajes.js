import { db, collection, getDocs } from './firebase.js';

const puntajesContainer = document.querySelector('#puntajesContainer');
const puntajesSpinner = document.querySelector('#puntajesSpinner');

let puntajes = [];


const obtenerPuntajes = async () => {
    const puntajesObtenidos = [];
    try {
        const query = await getDocs(collection(db, "puntajes"));
        query.forEach((doc) => {
            puntajesObtenidos.push(doc.data());
        });
        return puntajesObtenidos;
    } catch (error) {
        mostrarErrorCarga();
        console.log(error);
    }
    
}

const mostrarPuntajes = (array) => {
    let puntajesHtml = '';

    array.forEach((item, id) => {
        puntajesHtml += `
        <div class="puntajes__container__item">
          <p class='puesto'>${id + 1}</p>
          <p>${item.usuario}</p>
          <p>${item.nivel}</p>
          <p>${item.fecha}</p>
        </div>
        `
    });
    ocultarSpinner()
    puntajesContainer.innerHTML = puntajesHtml;
}

const ordenarPuntajesPorNivel = (puntajes) => {
    let puntajesOrdenados = puntajes;
    puntajesOrdenados.sort((a, b) => {
        if (a.nivel > b.nivel) {
            return -1;
        }
        if (a.nivel < b.nivel) {
            return 1;
        }
        return 0;
    })
    return puntajesOrdenados;
}

const ocultarSpinner = () => {
    puntajesSpinner.setAttribute('style', 'display:none;')
}

const mostrarErrorCarga = () =>{
    puntajesContainer.innerHTML = `
        <h2 class='text-center text-danger'>¡Error al intentar cargar puntajes!</h2>
    `
}

puntajes = await obtenerPuntajes();
let puntajesOrdenados = ordenarPuntajesPorNivel(puntajes);
mostrarPuntajes(puntajesOrdenados);