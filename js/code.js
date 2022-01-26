document.addEventListener("DOMContentLoaded", function(event) {
    //código a ejecutar cuando el DOM está listo para recibir acciones    
    juego =new Juego();
    var app = new Aplicacion(juego);
    document.getElementById('btn-jugar').disabled=true;

    document.getElementById('btn-cargarDatos').addEventListener('click',function(){
        app.evtoCargarDatos();
    });
    document.getElementById('btn-jugar').addEventListener('click',function(){
        app.iniciar();
    });
});

class Aplicacion {
    
    constructor(juego){
        this.juego=juego;
        document.getElementById("lblResultado").textContent="";
        document.getElementById("lblNivel").textContent="";
    }

    iniciar(){
        this.evtoGenerarCuadroAleatorio();
        document.getElementById('lblNivel').textContent=this.juego.nivel;
        this.evtoElegirCuadro();
    }

    evtoGenerarCuadroAleatorio(){
        this.juego.secuencia = [];
        this.juego.secuenciaJugador = [];
        this.juego.generarCuadroAleatorio;
        Aplicacion.mostrarSecuencia();
    }

    static mostrarSecuencia(){
        let indice = 0;
        let resaltado = false;
        var proceso = setInterval(function(){
            if (indice < juego.secuencia.length){
                document.getElementById('lblResultado').textContent='¡JUEGO EN EJECUCIÓN!';
                if(resaltado==false){
                    resaltado = true;
                    document.getElementById(`cuadro${juego.secuencia[indice]}`).classList.add("resaltado");    
                }else{
                    resaltado =false
                    document.getElementById(`cuadro${juego.secuencia[indice]}`).classList.remove("resaltado");
                    indice++;
                }
            }else{
                clearInterval(proceso);
                document.getElementById('lblResultado').textContent='Su turno';
            }
        },700);
    }

    evtoElegirCuadro(){
        let cuadroVioleta = document.getElementById('cuadro0');
        let cuadroRojo = document.getElementById('cuadro1');
        let cuadroVerde = document.getElementById('cuadro2');
        let cuadroAzul = document.getElementById('cuadro3');
        //Animacion al clickear caja
        cuadroVioleta.addEventListener('click',function(){
            juego.cuadroElegido = 0; //Envio caja seleccionada a clase Juego
            cuadroVioleta.classList.add('resaltado');
            setTimeout(function(){
                cuadroVioleta.classList.remove('resaltado');
            },500); 
        });
        cuadroRojo.addEventListener('click',function(){
            juego.cuadroElegido = 1; //Envio caja seleccionada a clase Juego
            cuadroRojo.classList.add('resaltado');
            setTimeout(function(){
                cuadroRojo.classList.remove('resaltado');
            },500);
        });
        cuadroVerde.addEventListener('click',function(){
            juego.cuadroElegido = 2; //Envio caja seleccionada a clase Juego
            cuadroVerde.classList.add('resaltado');
            setTimeout(function(){
                cuadroVerde.classList.remove('resaltado');
            },500);
        });
        cuadroAzul.addEventListener('click',function(){
            juego.cuadroElegido = 3; //Envio caja seleccionada a clase Juego
            cuadroAzul.classList.add('resaltado');
            setTimeout(function(){
                cuadroAzul.classList.remove('resaltado');
            },500);
        });
    }

    evtoCargarDatos() {
        //Muestro el modal de ingreso
        var myModal = new bootstrap.Modal(document.getElementById("modalIngreso"), {});
        myModal.show();
        document.getElementById('inputUsuario-validation').style.opacity=0;
        document.getElementById('inputCorreo-validation').style.opacity=0;

        //Validación de datos
        document.getElementById('btn-login').addEventListener( 'click' , function(){
            let usuarioVal = false
            let correoVal = false;
            if(document.getElementById('inputUsuario').value != ""){
                usuarioVal = true;
                document.getElementById('inputUsuario-validation').style.opacity = 0;
            }else{
                document.getElementById('inputUsuario-validation').style.opacity = 1;
            }
            let correo = document.getElementById('inputCorreo').value;
            if(correo.indexOf("@") != (-1)&&correo.indexOf(".com") != (-1)){
                correoVal = true;
                document.getElementById('inputCorreo-validation').style.opacity = 0;
            }else{
                document.getElementById('inputCorreo-validation').style.opacity = 1;
            }
            if(correoVal && usuarioVal){
                myModal.hide();
                //Habilita el boton para jugar :v
                document.getElementById('btn-jugar').disabled = false;
                //Muestra los datos ingresados//
                document.getElementById('lblJugador').textContent = document.getElementById('inputUsuario').value;
                document.getElementById('lblCorreo').textContent = document.getElementById('inputCorreo').value;
                let fechahoy= new Date();
                let fechafinal = String(fechahoy.getDate() + "/" + fechahoy.getMonth()+1 + "/" + fechahoy.getFullYear());
                document.getElementById('lblFecha').textContent = fechafinal;
            }
        });
    }
}