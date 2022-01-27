class Aplicacion {
    constructor(juego){
        this.juego=juego;
        document.getElementById("lblResultado").textContent="---";
        document.getElementById("lblNivel").textContent="---";
    }

    iniciar(){
        this.juego.secuencia = [];
        this.juego.secuenciaJugador = [];
        this.juego.nivel=1;
        document.getElementById('lblNivel').textContent=this.juego.nivel;
        document.getElementById('btn-jugar').disabled=true;
        this.evtoGenerarCuadroAleatorio();
        //this.agregarEvtosClick();
    }

    evtoGenerarCuadroAleatorio(){
        this.juego.generarCuadroAleatorio;
        Aplicacion.mostrarSecuencia();
    }

    static mostrarSecuencia(){
        let indice = 0;
        let resaltado = false;
        app.eliminarEvtosClick(); //quito eventos de click, de niveles anteriores
        var proceso = setInterval(function(){ //muestra la secuencia entera, cada 600ms
            if (indice < juego.secuencia.length){
                document.getElementById('lblResultado').textContent='¡JUEGO EN EJECUCIÓN!';
                if(resaltado==false){
                    resaltado = true;
                    document.getElementById(`cuadro${juego.secuencia[indice]}`).classList.add("resaltado");    
                }else{
                    resaltado =false
                    document.getElementById(`cuadro${juego.secuencia[indice]}`).classList.remove("resaltado");
                    indice++; //luego de hacer iluminar el cuadro aumenta de posicion en el array de secuencia.
                }
            }else{
                clearInterval(proceso);
                document.getElementById('lblResultado').textContent='Su turno';
                app.agregarEvtosClick(); //terminada la secuencia, agrego eventos click
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
        //capturo desde el evento, el id del cuadro clickeado
        let cuadroElegido = Number(event.target.id[event.target.id.length-1]);
        //Resalto el cuadro seleccionado
        document.getElementById(`cuadro${cuadroElegido}`).classList.add('resaltado');
        setTimeout(function(){
            document.getElementById(`cuadro${cuadroElegido}`).classList.remove('resaltado');
        },400);

        juego.cuadroElegido = cuadroElegido; //Envio numero del cuadro clickeado para validar.
    }

    evtoCargarDatos() {
        //Muestro el modal de ingreso
        var myModal = new bootstrap.Modal(document.getElementById("modalIngreso"), {});
        myModal.show();
        //oculto mensajes de error en validación
        document.getElementById('inputUsuario-validation').style.opacity=0;
        document.getElementById('inputCorreo-validation').style.opacity=0;

        //Validación de datos al hacer click en btn login
        document.getElementById('btn-login').addEventListener( 'click' , function(){
            let usuarioVal = false
            let correoVal = false;
            //validacion de usuario
            if(document.getElementById('inputUsuario').value != ""){
                usuarioVal = true;
                document.getElementById('inputUsuario-validation').style.opacity = 0;
            }else{
                document.getElementById('inputUsuario-validation').style.opacity = 1;
            }
            //validacion de correo
            let correo = document.getElementById('inputCorreo').value;
            if(correo.indexOf("@") != (-1)&&correo.indexOf(".com") != (-1)){
                correoVal = true;
                document.getElementById('inputCorreo-validation').style.opacity = 0;
            }else{
                document.getElementById('inputCorreo-validation').style.opacity = 1;
            }
            //usuario y correo son validos:
            if(correoVal && usuarioVal){
                myModal.hide();
                //Habilita el boton para jugar 
                document.getElementById('btn-jugar').disabled = false;
                //Muestra los datos ingresados en caja de informacion//
                document.getElementById('lblJugador').textContent = document.getElementById('inputUsuario').value;
                document.getElementById('lblCorreo').textContent = document.getElementById('inputCorreo').value;
                //cargo fecha actual
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

