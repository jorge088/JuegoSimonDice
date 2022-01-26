class Juego{
     constructor(){
          this.nivel=1;
          this.secuencia = [];
          this.secuenciaJugador = [];
     }
     get generarCuadroAleatorio(){
          //Genero el cuadro aleatorio.
          let cuadroAleat = Math.trunc(Math.random()*4);
          //guardo en array de secuencia
          this.secuencia.push(cuadroAleat);
          return cuadroAleat;
     }
     set cuadroElegido(indice){
          this.secuenciaJugador.push(indice);
          var sigueJugando = false;
          
          for(let i =0 ;i < this.secuenciaJugador.length;i++){
               if(this.secuencia[i] != this.secuenciaJugador[i]){
                    document.getElementById('lblResultado').textContent = "FIN DEL JUEGO";
                    break;
               }else{
                    if(i==this.secuenciaJugador.length-1 ){
                         sigueJugando = true;
                    }
               }
          }
          if(sigueJugando){
               if(this.secuenciaJugador.length == this.secuencia.length){
                    app.eliminarEvtosClick();
                    this.nivel++;
                    this.secuenciaJugador = [];
                    this.generarCuadroAleatorio;
                    document.getElementById("lblResultado").textContent= "¡BIEN HECHO!";
                    setTimeout(function(){
                         
                         document.getElementById('lblNivel').textContent=this.juego.nivel;
                         Aplicacion.mostrarSecuencia();
                         
                    },1300);
               }
          }
     }
     
}