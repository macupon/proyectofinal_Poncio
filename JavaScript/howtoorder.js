// Parseamos obj_pedido y AyudaGuardar del localStorage para recuperar las propiedades del objeto pedido de la sesion anterior

let obj_pedido;
let recuperar_pedido;
let pedidoRecuperado;


// Comprobar si obj_pedido existe
if (localStorage.getItem("obj_pedido")){
    pedidoRecuperado = JSON.parse(localStorage.getItem("obj_pedido"));

    Swal.fire({
        title: 'Quieres recuperar el último pedido?',
        showDenyButton: true,
        confirmButtonText: 'Recuperar',
        denyButtonText: `Nuevo pedido`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            document.getElementById("Inp_invitados").value = pedidoRecuperado.NumPersonas

            //recupero relleno
            let rell_recup = pedidoRecuperado.Rell_ArrayObj.find(element => element.id == pedidoRecuperado.relleno).id
            document.getElementById(rell_recup).checked = true
        
            let biz_recup = pedidoRecuperado.Biz_ArrayObj.find(element => element.id == pedidoRecuperado.bizcocho).id
            document.getElementById(biz_recup).checked = true
        
            let cov_recup = pedidoRecuperado.Cov_ArrayObj.find(element => element.id == pedidoRecuperado.cover).id
            document.getElementById(cov_recup).checked = true
        
            let deco_recup = pedidoRecuperado.Dec_ArrayObj.find(element => element.id == pedidoRecuperado.deco).id
            document.getElementById(deco_recup).checked = true
            
            //PICKUP-DELIVERY 
            pedidoRecuperado.PickDel == "pickup" ? (document.getElementById("butt_del").checked = false, document.getElementById("butt_pick").checked = true):
                                                   (document.getElementById("butt_del").checked = true,  document.getElementById("butt_pick").checked = false);
        
            document.getElementById("DKK_total").innerText = pedidoRecuperado.precioFinal + " DKK";
            document.getElementById("EUR_total").innerText = pedidoRecuperado.precioFinal_EUR + " EUR";

        // Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            localStorage.clear(obj_pedido)
        // Swal.fire('Changes are not saved', '', 'info')
        }
    })

    
}

// Definimos CLASES
class Torta {
    constructor(relleno, bizcocho, NumPersonas, cover, deco, PickDel, precioFinal_EUR){
        this.relleno = relleno;
        this.bizcocho = bizcocho;
        this.cover = cover;
        this.deco = deco;
        this.PickDel = PickDel;
        this.NumPersonas = NumPersonas;
        this.precioBase = 600;
        this.precioFinal_EUR = precioFinal_EUR;


        // Definimos ARRAYS
        this.Rell_ArrayObj = [ {id:'WCB', nombre: 'White Chocolate Buttercream', precio: 100},
                          {id:'DCB', nombre: 'Dark Chocolate Buttercream', precio: 100},
                          {id:'BB',  nombre: 'Berries Buttercream', precio: 100},
                          {id:'VB',  nombre: 'Vanilla Buttercream', precio: 100},
                          {id:'LB',  nombre: 'Lemon Buttercream', precio: 100}
                         ]
         
        this.Biz_ArrayObj = [  {id:'VS', nombre: 'Vanilla sponge', precio: 100},
                          {id:'CS', nombre: 'Dark Chocolate sponge', precio: 100},
                          {id:'BV', nombre: 'Berries-Vanilla sponge', precio: 100},
                          {id:'LV', nombre: 'Lemon-Vanilla sponge', precio: 100},
                          {id:'RV', nombre: 'Red Velvet sponge', precio: 100}
                        ]
         
        this.Cov_ArrayObj = [ {id:'NB', nombre: 'Naked Buttercream', precio: 100},
                         {id:'B',  nombre: 'Dark/White chocolate buttercream', precio: 100},
                         {id:'N',  nombre: 'Naked', precio: 100},
                         {id:'F', nombre: 'Fondant', precio: 100},
                         {id:'G', nombre: 'Ganache', precio: 100}
                        ]
         
        this.Dec_ArrayObj = [ {id:'F', nombre: 'Flowers', precio: 100},
                         {id:'R',  nombre: 'Rainbows', precio: 100},
                         {id:'L',  nombre: 'Letter cake', precio: 100},
                         {id:'M', nombre: 'Minimalistic', precio: 100},
                         {id:'T', nombre: 'Thematic', precio: 100}
                        ]


         this.tam_ArrayObj = [ { tam: "pequenio", precio: 0},
                        { tam: "mediano",  precio: 500},
                        { tam: "grande",   precio: 1000},
                        { tam: "gigante",   precio: 2000}];
    }
    
    // Definimos METODOS
    // metodo para calcular el tamanio
    calcTamanio(personas){
        this.NumPersonas = personas;
        if (personas <= 5) {
            this.tam = "pequenio";
            } 
        else if (personas > 5 && personas <= 15) {
            this.tam = "mediano";
            } 
        else if (personas > 15 && personas <= 25) {
            this.tam = "grande";
            } 
        else {
            this.tam = "gigante";
            } 
        }

    // metodo para calcular PRECIO FINAL 
    CalcPrecioFinal(){
        let precioRelleno  = this.Rell_ArrayObj.find(element => element.id ===  this.relleno).precio;
        let precioBizcocho = this.Biz_ArrayObj.find(element => element.id ===  this.bizcocho).precio;
        let precioCover = this.Cov_ArrayObj.find(element => element.id ===  this.cover).precio;
        let precioDeco = this.Dec_ArrayObj.find(element => element.id ===  this.deco).precio;
        let precioTamanio  = this.tam_ArrayObj.find(element => element.tam ===  this.tam).precio;

        this.precioFinal   = this.precioBase + precioRelleno 
                                             + precioBizcocho
                                             + precioCover
                                             + precioDeco
                                             + precioTamanio;
    }

    // metodo para resumir el pedido
    pedidoResumen() {
        let ped_tam = this.tam
        let ped_biz = this.Biz_ArrayObj.find(element => element.id ===  this.bizcocho).nombre;
        let ped_rell = this.Rell_ArrayObj.find(element => element.id ===  this.relleno).nombre;
        let ped_cov = this.Cov_ArrayObj.find(element => element.id ===  this.cover).nombre;
        let ped_deco = this.Dec_ArrayObj.find(element => element.id ===  this.deco).nombre;
        
        Swal.fire({
            title: 'Está seguro que desea enviar el pedido?',
            text: "Resumen del pedido pedido:\n\ttamano: "+ ped_tam
                                        + "\n\tbizcocho: "+ ped_biz
                                        + "\n\trelleno: " + ped_rell
                                        + "\n\tcover " + ped_cov
                                        + "\n\tdecoración: " + ped_deco
                                        + "\n\nPrecio final: "+ this.precioFinal +"Krs.",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Enviar!',
            denyButtonText: `Aun no`,
            }).then((result) => {
            
            if (result.isConfirmed) {
            Swal.fire('Gracias por realizar su pedido!', '', 'success')
            } else if (result.isDenied) {
            // Swal.fire('Pedido no Guardado', '', 'info')
            }
  })
    }

}



////////////////////////////////////////////////////////////////////////
// Activamos el boton que toca por tamanio
let inp_box_inp = document.getElementById("Inp_invitados");
let tamanioChica = document.getElementById("but_10x15");
let tamanioMediana = document.getElementById("but_15x15");
let tamanioGrande = document.getElementById("but_20x15");

inp_box_inp.addEventListener('input',  () => {
    let inv = inp_box_inp.value
    if (inv<=5) {
        tamanioChica.style = "background-color: #c44569"
        tamanioMediana.style = "background-color: #ffffff"
        tamanioGrande.style = "background-color: #ffffff"
    }
    else if (inv > 5 && inv <= 15) {
        tamanioChica.style = "background-color: #ffffff"
        tamanioMediana.style = "background-color: #c44569"
        tamanioGrande.style = "background-color: #ffffff"
    }
    else if (inv > 15) {
        tamanioChica.style = "background-color: #ffffff"
        tamanioMediana.style = "background-color: #ffffff"
        tamanioGrande.style = "background-color: #c44569"
    }
});
////////////////////////////////////////////////////////////////////////

// leer tamaño - solo para boton ahora
let butt_calc = document.getElementById("calc");
let DKK_calc_total= document.getElementById("DKK_total")
let EUR_calc_total= document.getElementById("EUR_total")

calc.addEventListener("click", () => {
    
    // Creamos objeto vacio de la clase Torta
    const pedido = new Torta()

    // Leer numero de invitados desde el box input
    let invitados = parseInt(document.getElementById("Inp_invitados").value)

    // Calculamos el TAMAÑO con el numero de invitados
    pedido.calcTamanio(invitados);

    // let butt_tam  = document.querySelector('input[name="Size"]:checked')
    let card_rell = document.querySelector('input[name="relleno"]:checked')
    let card_biz  = document.querySelector('input[name="Sponge"]:checked')
    let card_cov  = document.querySelector('input[name="cover"]:checked')
    let card_deco = document.querySelector('input[name="deco"]:checked')
    let but_del   = document.querySelector('input[name="delivery"]:checked')

    pedido.relleno = card_rell.value
    pedido.bizcocho = card_biz.value
    pedido.cover = card_cov.value
    pedido.deco = card_deco.value
    pedido.PickDel = but_del.value
    

    // checks antes de calcular precio final
    // Nos aseguramos que invitados es un numero
    if (isNaN(invitados) ) {
        Swal.fire({
            title: 'El numero de invitados tiene que ser un numero!',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        
    }
    else if (invitados>25) {
        Swal.fire({
            title: 'Para más de 25 invitados, por favor envíanos un e-mail',
            text: 'milocakery@gmail.com',
            icon: 'info',
            confirmButtonText: 'Cool'
          })
    }
    else {
        // 4) Calcular precio final 
        pedido.CalcPrecioFinal();
        DKK_calc_total.innerText = pedido.precioFinal + "DKK";


        fetch('https://api.exchangerate-api.com/v4/latest/DKK')
        .then((response) => response.json())
        .then(data => {
            let exchangeRate = data.rates.EUR
            let precioEUR = pedido.precioFinal * exchangeRate
            EUR_calc_total.innerText = precioEUR + " EUR";
            pedido.precioFinal_EUR = precioEUR;
            localStorage.setItem("obj_pedido", JSON.stringify(pedido))
            });

        

        // Confirmar pedido
        let res = pedido.pedidoResumen();
    
    }
    


});

////////////////////////////////////////////////////////////////////////


let input_dirs = document.getElementById("Inp_direccion")



let butt_calc_delivery = document.getElementById("calc_delivery")

////////////////////////////////////////////////////////////////////////




// let tamanioChica = document.getElementById("button1");
// let tamanioMediana = document.getElementById("button2");
// let tamanioGrande = document.getElementById("button3");

// tamanioChica.addEventListener("click", () => {
//         tamanioChica.style = "background-color: #ff6b81"
//     setTimeout(() => {
//         tamanioGrande.style = "background-color: #ffffff"
//         tamanioMediana.style = "background-color: #ffffff"
//     }, 2000);
// });
// tamanioMediana.addEventListener("click", () => {
//     tamanioMediana.style = "background-color: #ff6b81"
//     setTimeout(() => {
//         tamanioChica.style = "background-color: #ffffff"
//         tamanioGrande.style = "background-color: #ffffff"
//     }, 2000);
// });
// tamanioGrande.addEventListener("click", () => {
//     tamanioGrande.style = "background-color: #ff6b81"
//     setTimeout(() => {
//         tamanioChica.style = "background-color: #ffffff"
//         tamanioMediana.style = "background-color: #ffffff"
//     }, 2000);
// });

// let pickup = document.getElementById("pickup");
// let delivery = document.getElementById("delivery");

// pickup.addEventListener("click", () => {
//     pickup.style = "background-color: #ff6b81"
// setTimeout(() => {
//     delivery.style = "background-color: #ffffff"
// }, 2000);
// });
// delivery.addEventListener("click", () => {
// delivery.style = "background-color: #ff6b81"
// setTimeout(() => {
//     pickup.style = "background-color: #ffffff"
// }, 2000);
// });

