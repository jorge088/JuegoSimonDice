class VistaJuego {
    constructor() {
        this.clickPermitido = false;
        this.sonidoOn = true;
        this.notas = {
            notaDo: new Audio('./../Assetts/sonidos/do.wav'),
            notaRe: new Audio('./../Assetts/sonidos/re.wav'),
            notaMi: new Audio('./../Assetts/sonidos/mi.wav'),
            notaSi: new Audio('./../Assetts/sonidos/si.wav')
        }
    }

    iniciar() {
        document.querySelector('#nivel').textContent = '-';
        document.querySelector('#status').textContent = ''
        this.generarBtnJugar();
    }

    //Genera btn para controlar el juego en el DOM
    generarBtnJugar() {
        const tablero = document.querySelector('#tablero');
        tablero.innerHTML += `
            <button id="btn-jugar" class="btnJugar">Jugar</button>
        `
    }

    //Oculta btnJugar durante ejecución
    ocultarBtnJugar() {
        const btnJugar = document.querySelector('#btn-jugar');
        btnJugar.classList.add('oculto');
    }

    //Mostrar btnJugar cuando finaliza el juego
    mostrarBtnJugar(texto) {
        const btnJugar = document.querySelector('#btn-jugar');
        btnJugar.classList.remove('oculto');
        btnJugar.textContent = texto
    }

    actualizarNivelInfo(nivel) {
        document.querySelector('#nivel').textContent = `${nivel}`;
    }

    actualizarStatusInfo(status) {
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
                    this.sonidoOn && this.reproducirNota(secuencia[indice])
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
        this.sonidoOn && this.reproducirNota(cuadro)
        setTimeout(() => {
            document.getElementById(`cuadro${cuadro}`).classList.remove("resaltado");
        }, 300);
    }

    reproducirNota(cuadro) {
        let audio;
        switch (cuadro) {
            case 0: audio = this.notas.notaDo;
                break;
            case 1: audio = this.notas.notaRe;
                break;
            case 2: audio = this.notas.notaMi;
                break;
            case 3: audio = this.notas.notaSi;
                break;
            default:
                console.log('Error');
                break;

        }
        if (audio.paused) {
            audio.play();
        } else {
            audio.currentTime = 0
        }
    }

}