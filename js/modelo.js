class Juego{
     constructor(){
          var jugador = new Jugador();
          var jugadores =[];
          this.nivel=1;
          this.jugadores=jugadores;
          this.jugador= jugador;
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
               console.log(i);
               if(this.secuencia[i] != this.secuenciaJugador[i]){
                    document.getElementById('lblResultado').textContent = "FIN DEL JUEGO";
                    break;
               }else{
                    if(i==this.secuenciaJugador.length-1 ){
                         console.log("Cambia condicion sigue jugando!");
                         console.log(this.secuencia);
                         console.log(this.secuenciaJugador);
                         sigueJugando = true;
                    }
               }
          }
          if(sigueJugando){
               if(this.secuenciaJugador.length == this.secuencia.length){
                    this.nivel++;
                    this.secuenciaJugador = [];
                    this.generarCuadroAleatorio;
                    document.getElementById("lblResultado").textContent= "¡BIEN HECHO!";
                    setTimeout(function(){
                         document.getElementById('lblNivel').textContent=this.juego.nivel;
                         Aplicacion.mostrarSecuencia();
                    },2000);
               }
          }
     }
}
class Jugador{
     constructor(ranking,nombre,pais,puntaje,fecha,correo){
         this.ranking = ranking;
         this.nombre = nombre;
         this.puntaje = puntaje;
         this.fecha = fecha;
         this.correo = correo;
     }
 }