class Aplicacion {
    constructor(juego){
        this.juego=juego;
        document.getElementById("lblResultado").textContent="";
        document.getElementById("lblNivel").textContent="";
    }

    iniciar(){
        this.juego.secuencia = [];
        this.juego.secuenciaJugador = [];
        this.juego.nivel=1;
        document.getElementById('btn-jugar').disabled=true;
        this.evtoGenerarCuadroAleatorio();
        document.getElementById('lblNivel').textContent=this.juego.nivel;
        //this.agregarEvtosClick();

    }

    evtoGenerarCuadroAleatorio(){
        this.juego.generarCuadroAleatorio;
        Aplicacion.mostrarSecuencia();
    }

    static mostrarSecuencia(){
        let indice = 0;
        let resaltado = false;
        app.eliminarEvtosClick();
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
                app.agregarEvtosClick();
            }
        },600);
    }

    agregarEvtosClick(){
        document.getElementById('cuadro0').addEventListener('click',this.elegirCuadro);
        document.getElementById('cuadro1').addEventListener('click',this.elegirCuadro);
        document.getElementById('cuadro2').addEventListener('click',this.elegirCuadro);
        document.getElementById('cuadro3').addEventListener('click',this.elegirCuadro);
    }
    eliminarEvtosClick(){
        document.getElementById('cuadro0').removeEventListener('click',this.elegirCuadro);
        document.getElementById('cuadro1').removeEventListener('click',this.elegirCuadro);
        document.getElementById('cuadro2').removeEventListener('click',this.elegirCuadro);
        document.getElementById('cuadro3').removeEventListener('click',this.elegirCuadro);
    }
    elegirCuadro(event){
        //capturo desde el evento el id del cuadro clickeado
        let cuadroElegido = Number(event.target.id[event.target.id.length-1]);
        //Resalto el cuadro seleccionado
        document.getElementById(`cuadro${cuadroElegido}`).classList.add('resaltado');
            setTimeout(function(){
                document.getElementById(`cuadro${cuadroElegido}`).classList.remove('resaltado');
            },400);
        juego.cuadroElegido = cuadroElegido; //Envio caja seleccionada a clase Juego
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
var juego =new Juego();
var app = new Aplicacion(juego);
document.getElementById('btn-jugar').disabled=true;
document.getElementById('btn-cargarDatos').addEventListener('click',function(){
    app.evtoCargarDatos();
});
document.getElementById('btn-jugar').addEventListener('click',function(){
    app.iniciar();
});

