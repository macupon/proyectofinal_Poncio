

// Definimos CLASES
class Torta {
    constructor(relleno, bizcocho, NumPersonas){
        this.relleno = relleno;
        this.bizcocho = bizcocho;
        this.NumPersonas = NumPersonas;
        this.precioBase = 600;


        // Definimos ARRAYS
        this.rellenos = [ { sabor: "chocolate", precio: 250},
                          { sabor: "vainilla",  precio: 100},
                          { sabor: "limon",     precio:  50}];

        this.bizcochos = [{ sabor: "chocolate", precio: 50},
                          { sabor: "vainilla",  precio: 40},
                          { sabor: "limon",     precio: 20}];

        this.tamanios = [ { tam: "pequenio", precio: 0},
                          { tam: "mediano",  precio: 500},
                          { tam: "grande",   precio: 1000},
                          { tam: "gigante",   precio: 1000000}];
    }
    
    // Definimos METODOS
    // metodo para calcular el tamanio
    calcTamanio(personas){
        this.NumPersonas = personas;
        if (personas >= 10 && personas <= 15) {
            this.tam = "pequenio";
            } 
        else if (personas > 15 && personas <= 20) {
            this.tam = "mediano";
            } 
        else if (personas > 20 && personas <= 30) {
            this.tam = "grande";
            } 
        else {
            this.tam = "gigante";
            } 
        }

    // metodo para calcular PRECIO FINAL 
    CalcPrecioFinal(){
        let precioRelleno  = this.rellenos.find(element => element.sabor ===  this.relleno).precio;
        let precioBizcocho = this.bizcochos.find(element => element.sabor ===  this.bizcocho).precio;
        let precioTamanio  = this.tamanios.find(element => element.tam ===  this.tam).precio;
        this.precioFinal   = this.precioBase + precioRelleno + precioBizcocho + precioTamanio;
    }

    // metodo para resumir el pedido
    pedidoResumen() {
        alert("Su pastel tiene un bizcocho de "+ this.bizcocho + ", un relleno de " + this.relleno + " y un tamanio " + this.tam + "\nEl precio total es de: " + this.precioFinal + " Krs.");
    }

}

// &&&&  antes de empezar &&&&&&
// Creamos objeto vacio de la clase Torta
const pedido = new Torta()

// preguntamos si necesita ayuda
let ayuda = prompt("Necesitas ayuda para ordenar? (Si o No)");


// Comprobar si "ayuda" es si o no, y sino volver a pedir.
while ((ayuda.toLowerCase() != "si") && (ayuda.toLowerCase() != "no")) {
    ayuda = prompt("Por favor indique si o no, \nNecesita ayuda?");
}

// Si order es "no" le damos las gracias
if (ayuda.toLowerCase() === "no") {
    alert("Hasta pronto! Gracias por ingresar a nuestra Web");
}

// Preguntar numero invitados cuando "ayuda" es SI
else if (ayuda.toLowerCase() === "si") {

    // 1) Obtener TAMAÑO de torta para rellenar propiedad "tam" del objeto "pedido"
    let invitados = parseInt(prompt("Comencemos! Cuantas personas asistiran?"));
    // Nos aseguramos que invitados es un numero
    while (isNaN(invitados)) {
        invitados = parseInt(prompt("Por favor, ingrese un numero!\nCuantas personas asistiran?"));
        }

    // Calculamos el TAMAÑO con el numero de invitados
    pedido.calcTamanio(invitados);
    localStorage.setItem("obj_pedido", JSON.stringify(pedido));
    alert(`Su pastel tendra un tamanio ${pedido.tam.toUpperCase()}`);

    // 2) Obtener RELLENO de torta para rellenar propiedad "relleno" del objeto "pedido"
    let pedRelleno = prompt("Escoga un relleno:\nChocolate \nVainilla \nLimon");
    let encontrado = false;
    while (encontrado === false) {
        pedido.rellenos.forEach(element => { 
            if (element.sabor == pedRelleno.toLowerCase()) {
                pedido.relleno = pedRelleno.toLowerCase();
                encontrado = true;
            }
        })
        if (encontrado === false) {
            pedRelleno = prompt("Por favor escoge entre:\nChocolate \nVainilla \nLimon");
        }
    };
    localStorage.setItem("obj_pedido", JSON.stringify(pedido));
    alert(`Relleno ${pedido.relleno.toUpperCase()}`)
    
    // 3) Obtener BIZCOCHO de torta para rellenar propiedad "bizcocho" del objeto "pedido"
    let pedBizcocho = prompt("Escoga el sabor de su bizcocho:\nChocolate \nVainilla \nLimon");

    let objEncontrado = pedido.bizcochos.find(element => element.sabor ===  pedBizcocho.toLowerCase());

    while (typeof objEncontrado === 'undefined'){
        pedBizcocho = prompt("Por favor escoge entre:\nChocolate \nVainilla \nLimon");
        objEncontrado = pedido.bizcochos.find(element => element.sabor ===  pedBizcocho.toLowerCase());
    }
    pedido.bizcocho = objEncontrado.sabor.toLowerCase();
    localStorage.setItem("obj_pedido", JSON.stringify(pedido));
        
    alert(`Bizcocho ${pedido.bizcocho.toUpperCase()}`)
  

    // 4) Calcular precio final 
    pedido.CalcPrecioFinal();
    alert(`Precio final ${pedido.precioFinal}`)
    
    // 5) Resumen pedido final 
    pedido.pedidoResumen();

    // guardamos el objeto completo
    localStorage.setItem("obj_pedido", JSON.stringify(pedido));
}
