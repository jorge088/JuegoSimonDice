
class ControladorJuego {
    constructor(firestore) {
        this.juego = new Juego();
        this.vistaJuego = new VistaJuego();
        this.cuadroSeleccionado = null;
        this.modalFinJuego = new bootstrap.Modal('#modalGameOver');
        this.resumenJuego = {};
        this.firestore = firestore;
    }

    //Carga datos del juego en pantalla y agregar events al tablero
    iniciar() {
        this.vistaJuego.iniciar();
        this.agregarEventoBtnJugar();
        this.agregarEventosClick();
        this.agregarEventosGuardarPuntaje();
        console.log(this.firestore);
    }

    agregarEventoBtnJugar() {
        const btnJugar = document.querySelector('#btn-jugar');
        btnJugar.addEventListener('click', () => {
            this.jugarNuevoNivel();
            this.vistaJuego.ocultarBtnJugar();
        })
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
        this.vistaJuego.actualizarNivelInfo(this.juego.nivel)
        this.juego.generarNuevoValorEnSecuencia();
        this.vistaJuego.mostrarSecuencia(this.juego.secuencia);
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
            this.resumenJuego = this.obtenerDatosJuego(); // Registra datos de la partida
            this.modalFinJuego.show();
            this.vistaJuego.mostrarBtnJugar('Reiniciar');
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

    //Obtener nivel alcanzado y fecha actual
    obtenerDatosJuego() {
        const nivel = this.juego.nivel;
        const date = new Date();
        const fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return { nivel, fecha };
    }

    //Registrar puntaje de juego
    agregarEventosGuardarPuntaje() {
        const modalRegistroPuntaje = new bootstrap.Modal(document.querySelector('#modalRegistroPuntaje'));

        //Evento submit de form en modalRegistro
        const formRegistro = document.querySelector('#form');
        formRegistro.addEventListener('submit', (event) => {
            event.preventDefault();

            const toast = new bootstrap.Toast(document.getElementById('liveToast'))


            let validado = true;

            if (!document.querySelector('#form').checkValidity()) {
                validado = false;
                event.stopPropagation()
            }
            formRegistro.classList.add('was-validated')

            if (validado) {
                const user = document.querySelector('#inputUsuario');
                this.resumenJuego = {
                    ...this.resumenJuego,
                    user: user.value
                };
                //Desactiva btnGuardar para evitar multiples registros
                const btnGuardar = document.querySelector('#btnGuardar');
                btnGuardar.disabled = true;

                setTimeout(() => {
                    // console.log(this.resumenJuego);
                    modalRegistroPuntaje.hide();
                    this.guardarPuntajeFirestore(this.firestore, this.resumenJuego); //Envia datos a bd
                    toast.show();

                    //Se resetea form luego de ocultarlo
                    setTimeout(() => {
                        formRegistro.classList.remove('was-validated');
                        formRegistro.reset();
                        btnGuardar.disabled = false;
                    }, 500);
                }, 1000);
            }

        });
    }

    //Registra datos en firebase
    async guardarPuntajeFirestore(firestore, datosJuego) {
        let { db, collection, addDoc } = firestore;
        let { nivel, fecha, user } = datosJuego;
        const response = await addDoc(collection(db, "puntajes"), {
            nivel,
            fecha,
            usuario: user
        });
    }

}