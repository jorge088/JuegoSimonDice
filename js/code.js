document.addEventListener("DOMContentLoaded", function(event) {
    //código a ejecutar cuando el DOM está listo para recibir acciones
    var app = new Aplicacion();
    document.getElementById('btn-jugar').disabled=true;

    document.getElementById('btn-cargarDatos').addEventListener('click',function(){
        app.evtoCargarDatos();
    });
    document.getElementById('btn-jugar').addEventListener('click',function(){

    });
});

class Aplicacion {
    constructor(){
        //this.juego=juego;
        document.getElementById("lblResultado").textContent="";
        document.getElementById("lblNivel").textContent="";
    }

    evtoCargarDatos() {
        //Muestro el modal de ingreso
        var myModal = new bootstrap.Modal(document.getElementById("modalIngreso"), {});
        myModal.show();
        document.getElementById('inputUsuario-validation').style.opacity=0;
        document.getElementById('inputCorreo-validation').style.opacity=0;
        let close=true;
        //Validación de datos

        document.getElementById('btn-login').addEventListener( 'click' , function(){
            let usuarioVal =false
            let correoVal=false;
            if(document.getElementById('inputUsuario').value != ""){
                usuarioVal=true;
                document.getElementById('inputUsuario-validation').style.opacity=0;
            }else{
                document.getElementById('inputUsuario-validation').style.opacity=1;
            }
            let correo = document.getElementById('inputCorreo').value;
            if(correo.indexOf("@")!=(-1)&&correo.indexOf(".com")!=(-1)){
                correoVal=true;
                document.getElementById('inputCorreo-validation').style.opacity=0;
            }else{
                document.getElementById('inputCorreo-validation').style.opacity=1;
            }
            if(correoVal && usuarioVal){
                myModal.hide();
                //Habilita el boton para jugar :v
                document.getElementById('btn-jugar').disabled=false;
                //Muestra los datos ingresados//
                document.getElementById('lblJugador').textContent = document.getElementById('inputUsuario').value;
                document.getElementById('lblCorreo').textContent = document.getElementById('inputCorreo').value;
                let fechahoy= new Date();
                let fechahoyanio = fechahoy.getFullYear();
                let fechahoymes = fechahoy.getMonth()+1;
                let fechahoydia = fechahoy.getDate();
                let fechafinal = String(fechahoydia + "/" + fechahoymes + "/" + fechahoyanio);
                document.getElementById('lblFecha').textContent=fechafinal;
            }
        });
    }
}