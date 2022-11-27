// Parseamos obj_pedido y AyudaGuardar del localStorage para recuperar las propiedad del objeto pedido
let obj_pedido;
let AyudaGuardar;
let pedidoRecuperado = JSON.parse(localStorage.getItem("obj_pedido"));
let ayudaRecuperada = JSON.parse(localStorage.getItem("AyudaGuardar"));


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
        if (personas >=10 && personas <= 15) {
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
// Miramos si el pedidoRecuperado esta completo, si es el caso, le preguntamos si quiere realizar otro
let resetear = false
// SI la variable pedidoRecuperado ya ha sido almacenada en su totalidad, por lo tanto el pedido esta completo, pregunto si quiere realizar un pedido nuevo.
if (pedidoRecuperado != null && pedidoRecuperado.precioFinal){
    resetear = confirm("El pedido ya esta completado, quiere realizar uno nuevo?")
}


// Si "AyudaGuardar" NO está en localStorage le preguntamos
let ayuda;
if (!ayudaRecuperada){
    // preguntamos si necesita ayuda
    ayuda = prompt("Necesitas ayuda para ordenar? (Si o No)");

    // Comprobar si "ayuda" es si o no, y sino volver a pedir.
    while ((ayuda.toLowerCase() != "si") && (ayuda.toLowerCase() != "no")) {
        ayuda = prompt("Por favor indique si o no, \nNecesita ayuda?");
    }

    // Nos guardamos si necesita ayuda
    localStorage.setItem('AyudaGuardar', JSON.stringify(ayuda))
}

else if (ayudaRecuperada){
    ayuda = ayudaRecuperada;
}

// Si order es "no" le damos las gracias
if (ayuda.toLowerCase() === "no") {
    alert("Hasta pronto! Gracias por ingresar a nuestra Web");
}

// Preguntar numero invitados cuando "ayuda" es SI
else if (ayuda.toLowerCase() === "si") {

    // Creamos objeto vacio de la clase Torta
    const pedido = new Torta()

    // SI el cliente NO ha rellenado la propiedad invitados del objeto, entonces accede directamente a preguntar Cantidad de personas
    if ((pedidoRecuperado == null) || resetear==true){
        // 1) Obtener TAMAÑO de torta para rellenar propiedad "tam" del objeto "pedido"
        let invitados;
        invitados = parseInt(prompt("Comencemos! Cuantas personas asistiran?"));
        // Nos aseguramos que invitados es un numero
        while (isNaN(invitados) || invitados<10) {
            invitados = parseInt(prompt("Por favor, ingrese un numero (mayor de 10)!\nCuantas personas asistiran?"));
            }

        // Calculamos el TAMAÑO con el numero de invitados
        pedido.calcTamanio(invitados);
        //Guardamos el objeto en Local Storage
        localStorage.setItem("obj_pedido", JSON.stringify(pedido));
        alert(`Su pastel tendra un tamanio ${pedido.tam.toUpperCase()}`);
    }
    
    // SI la propiedad TAM del objeto pedidoRecuperado/pedido ya existe, se recupera la informacion almacenada y "salta" a la propiedad RELLENO
    else if (pedidoRecuperado.tam !== undefined){
        pedido.calcTamanio(pedidoRecuperado.NumPersonas)
        // tb se puede hacer asi
        // pedido.NumPersonas = pedidoRecuperado.NumPersonas
        // pedido.tam = pedidoRecuperado.tam
    }

        
    // Acceder al condicional SI el pbjeto pedidoRecuperado no existe, O SI la propiedad RELLENO del pedidoRecuperado se encuentra vacio O SI el usuario a reseatado el pedido
    if (pedidoRecuperado == null || (pedidoRecuperado!==null && !pedidoRecuperado.relleno )  || resetear==true){
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
        //Guardamos el objeto en Local Storage
        localStorage.setItem("obj_pedido", JSON.stringify(pedido));
        alert(`Relleno ${pedido.relleno.toUpperCase()}`)
    }
    // SI la propiedad RELLENO del objeto pedidoRecuperado/pedido ya existe, se recupera la informacion almacenada y "salta" a la propiedad BIZCOCHO
    else if (pedidoRecuperado.relleno){
        pedido.relleno = pedidoRecuperado.relleno;
    }
        
    // Acceder al condicional SI el pbjeto pedidoRecuperado no existe, O SI la propiedad bizcocho del pedidoRecuperado se encuentra vacio O SI el usuario a reseatado el pedido
    if (pedidoRecuperado == null || (pedidoRecuperado!==null && !pedidoRecuperado.bizcocho) || resetear==true) {
        // 3) Obtener BIZCOCHO de torta para rellenar propiedad "bizcocho" del objeto "pedido"
        let pedBizcocho = prompt("Escoga el sabor de su bizcocho:\nChocolate \nVainilla \nLimon");

        let objEncontrado = pedido.bizcochos.find(element => element.sabor ===  pedBizcocho.toLowerCase());

        while (typeof objEncontrado === 'undefined'){
            pedBizcocho = prompt("Por favor escoge entre:\nChocolate \nVainilla \nLimon");
            objEncontrado = pedido.bizcochos.find(element => element.sabor ===  pedBizcocho.toLowerCase());
        }
        pedido.bizcocho = objEncontrado.sabor.toLowerCase();
        //Guardamos el objeto en Local Storage
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
    // SI la propiedad BIZCOCHO del objeto pedidoRecuperado/pedido ya existe, se recupera la informacion almacenada y finaliza el pedido.
    else if (pedidoRecuperado.bizcocho){
        pedido.bizcocho = pedidoRecuperado.bizcocho;
    }


}
