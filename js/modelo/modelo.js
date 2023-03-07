class Juego {
    constructor() {
        this.nivel = 1;
        this.secuencia = [];
        this.secuenciaJugador = [];
        this.sigueJugando = true;
        this.nuevoNivel = false;
    }

    reiniciarJuego(){
        this.nivel = 1,
        this.secuencia = [];
        this.secuenciaJugador = [];
        this.sigueJugando = true;
        this.nuevoNivel = true;
    }

    subirNivel() {
        this.nivel++;
    }

    generarNuevoValorEnSecuencia() {
        let cuadroAleat = Math.trunc(Math.random() * 4);
        this.secuencia.push(cuadroAleat);
    }

    //Verifica coincidencia entre la secuencia y secuenciaJugador.
    checkEleccion(eleccion) {
        this.secuenciaJugador.push(eleccion);

        // console.log(`EN CHECKEO DE ELECCION: 
        // SECUENCIA LENGTH ${this.secuencia.length}
        // SECUENCIA JUGADOR LENGTH ${this.secuenciaJugador.length}`);

        for (let i = 0; i < this.secuenciaJugador.length; i++) {
            if (this.secuencia[i] != this.secuenciaJugador[i]) {

                // alert("FIN DEL JUEGO")
                // console.log(`NO HUBO COINCIDENCIA EN LA POSICION ${i}
                // VALOR EN SECUENCIA ${this.secuencia[i]}
                // VALOR EN SECUENCIA JUGADOR ${this.secuenciaJugador[i]}`);

                this.sigueJugando = false;
                break;
            }
        }
        this.checkSiguienteNivel();
    }

    //Verifica estado del juego y comprueba si avanza de nivel
    checkSiguienteNivel() {
        if (this.sigueJugando) {
            if (this.secuenciaJugador.length < this.secuencia.length) {
                this.sigueJugando = true; //Si secuenciaJugador tiene menos elementos, aún falta seleccionar cuadros.
            } else {
                if (this.secuenciaJugador.length === this.secuencia.length) { //Pasa de nivel, secuencias iguales
                    this.nuevoNivel = true;
                    this.secuenciaJugador = [];
                    this.subirNivel();
                }
            }
        }
    }



}