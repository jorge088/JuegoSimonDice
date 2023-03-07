const btnJugar = document.querySelector('#btn-jugar');
const juego = new ControladorJuego();
juego.iniciar();    

btnJugar.addEventListener('click', () => {
    juego.jugarNuevoNivel();
})

