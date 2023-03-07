class ControladorJuego {
    constructor() {
        this.juego = new Juego();
        this.vistaJuego = new VistaJuego();
        this.cuadroSeleccionado = null;
    }

    //Carga datos del juego en pantalla y agregar events al tablero
    iniciar() {
        this.vistaJuego.iniciar();
        this.agregarEventosClick()
    }

    //Obtiene tablero seleccionado y lo verifica con la secuencia mostrada.
    agregarEventosClick() {
        let self = this; //Para no perder la referencia al objeto controlador dentro del EventListener, porque cambia el contexto.
        let numeroCuadro;
        const tablero = document.querySelector('#tablero')
        tablero.addEventListener('click', (e) => {
            if (self.vistaJuego.clickPermitido) {
                numeroCuadro = parseInt(e.target.id[e.target.id.length - 1]); //obtengo el numero de cuadro
                self.cuadroSeleccionado = numeroCuadro;
                self.vistaJuego.mostrarEleccion(self.cuadroSeleccionado);
                self.verificarSecuencia();
            }
            e.stopPropagation()
        })
    }

    jugarNuevoNivel() {
        this.actualizarBtnJugarStatus();
        this.vistaJuego.actualizarNivelInfo(this.juego.nivel)
        this.juego.generarNuevoValorEnSecuencia();
        this.vistaJuego.mostrarSecuencia(this.juego.secuencia);
    }

    actualizarBtnJugarStatus(){
        if(this.juego.sigueJugando){
            document.querySelector('#btn-jugar').disabled = true;
            document.querySelector('#btn-jugar').textContent = 'En ejecución';
        }else{
            document.querySelector('#btn-jugar').disabled = false;
            document.querySelector('#btn-jugar').textContent = 'Volver a jugar';
        }
    }

    //Delega la verificación de secuencia al modelo
    verificarSecuencia() {
        // console.log(this);
        this.juego.checkEleccion(this.cuadroSeleccionado);
        this.checkearCambioDeNivel();
    }

    //Verifica el estado del juego luego de verificar la secuencia. Inicia nuevo nivel ó finaliza el juego.
    checkearCambioDeNivel() {
        this.cuadroSeleccionado = null;
        if (!this.juego.sigueJugando) {

            this.vistaJuego.clickPermitido = false;
            this.vistaJuego.actualizarStatusInfo('FIN DEL JUEGO');
            this.actualizarBtnJugarStatus();
            this.juego.reiniciarJuego();
            

        } else {
            if (this.juego.nuevoNivel) {

                this.juego.nuevoNivel = false;
                this.vistaJuego.clickPermitido = false;
                this.vistaJuego.actualizarStatusInfo('¡BIEN HECHO! SUBE DE NIVEL')

                setTimeout(() => {
                    this.jugarNuevoNivel();
                }, 1500);
            }
        }
    }

}