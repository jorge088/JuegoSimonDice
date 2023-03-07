class VistaJuego {
    constructor() {
        this.clickPermitido = false;
    }

    iniciar() {
        document.querySelector('#nivel').textContent = '-';
        document.querySelector('#status').textContent = '-'
        
    }

    actualizarNivelInfo(nivel) {
        document.querySelector('#nivel').textContent = `${nivel}`;
    }

    actualizarStatusInfo(status){
        document.querySelector('#status').textContent = `${status}`
    }

    //Mostrar secuencia en DOM y actualizar estado para permitir clicks
    mostrarSecuencia(secuencia) {
        let indice = 0;
        let iluminado = false;
        this.actualizarStatusInfo('SECUENCIA EN EJECUCIÓN')
        let muestreo = setInterval(() => {
            if (indice < secuencia.length) {
                if (iluminado) {
                    iluminado = false;
                    document.getElementById(`cuadro${secuencia[indice]}`).classList.remove("resaltado");
                    indice++;

                } else {
                    iluminado = true;
                    document.getElementById(`cuadro${secuencia[indice]}`).classList.add("resaltado");
                }
            } else {
                clearInterval(muestreo)
                this.clickPermitido = true;
                this.actualizarStatusInfo("SELECCIONE COLOR")
            }

        }, 600);
    }

    //Ilumina el cuadro seleccionado
    mostrarEleccion(cuadro) {
        document.getElementById(`cuadro${cuadro}`).classList.add("resaltado");
        setTimeout(() => {
            document.getElementById(`cuadro${cuadro}`).classList.remove("resaltado");
        }, 300);
    }

}