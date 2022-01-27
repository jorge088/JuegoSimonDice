class Juego{

     constructor(){
          this.nivel=1;
          this.secuencia = [];
          this.secuenciaJugador = [];
     }
     
     get generarCuadroAleatorio(){
          //Genero un num aleatorio entre 0 y 3.
          let cuadroAleat = Math.trunc(Math.random()*4);
          //guardo en array de secuencia
          this.secuencia.push(cuadroAleat);
          return cuadroAleat;
     }

     set cuadroElegido(indice){
          this.secuenciaJugador.push(indice);
          var sigueJugando = false;
          //compara secuencia y secuencia del jugador
          for(let i =0 ;i < this.secuenciaJugador.length;i++){
               if(this.secuencia[i] != this.secuenciaJugador[i]){
                    //son distintos en alguna posicion, fin del juego
                    document.getElementById('lblResultado').textContent = "FIN DEL JUEGO";
                    app.eliminarEvtosClick();
                    document.getElementById('btn-jugar').disabled=false;
                    //muestro modal de GameOver
                    let myModal = new bootstrap.Modal(document.getElementById("modalGameOver"), {});
                    myModal.show();
                    document.getElementById("btn-continuar").addEventListener('click',function(){
                         myModal.hide();
                    });
                    break;
               }else{
                    if(i==this.secuenciaJugador.length-1 ){
                         //se recorre toda la secuencia de jugador
                         sigueJugando = true;
                    }
               }
          }
          if(sigueJugando){
               if(this.secuenciaJugador.length == this.secuencia.length){//si no son iguales, es porque falta clickear cuadros
                    //Paso de nivel, quito eventos click
                    app.eliminarEvtosClick();
                    this.nivel++;
                    this.secuenciaJugador = [];
                    this.generarCuadroAleatorio;
                    document.getElementById("lblResultado").textContent= "¡BIEN HECHO!";
                    setTimeout(function(){ //espera 1300ms para iniciar sig nivel
                         document.getElementById('lblNivel').textContent=this.juego.nivel;
                         Aplicacion.mostrarSecuencia();
                         
                    },1300);
               }
          }
     }
}