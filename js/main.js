import { db, collection, addDoc } from './firebase.js';
const firestore = { db, collection, addDoc }

const juego = new ControladorJuego(firestore);
juego.iniciar();