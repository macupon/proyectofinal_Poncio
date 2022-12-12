// Parseamos obj_pedido y AyudaGuardar del localStorage para recuperar las propiedades del objeto pedido de la sesion anterior
let obj_pedido;
let AyudaGuardar;
let pedidoRecuperado = JSON.parse(localStorage.getItem("obj_pedido"));
let ayudaRecuperada = JSON.parse(localStorage.getItem("AyudaGuardar"));


// Definimos CLASES
class Torta {
    constructor(relleno, bizcocho, NumPersonas, cover, deco, PickDel){
        this.relleno = relleno;
        this.bizcocho = bizcocho;
        this.cover = cover;
        this.deo = deco;
        this.PickDel = PickDel
        this.NumPersonas = NumPersonas;
        this.precioBase = 600;


        // Definimos ARRAYS
        this.Rell_ArrayObj = [ {id:'WCB', nombre: 'White Chocolate Buttercream', precio: 100},
                          {id:'DCB', nombre: 'Dark Chocolate Buttercream', precio: 100},
                          {id:'BB',  nombre: 'Berries Buttercream', precio: 100},
                          {id:'VB',  nombre: 'Vanilla Buttercream', precio: 100},
                          {id:'LB',  nombre: 'Lemon Buttercream', precio: 100}
                         ]
         
        this.Biz_ArrayObj = [  {id:'VS', nombre: 'Vanilla sponge', precio: 100},
                          {id:'DC', nombre: 'Dark Chocolate sponge', precio: 100},
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
        
        confirm("Enviar el siguiente pedido:\n\ttamano: "+ ped_tam
                                         + "\n\tbizcocho: "+ ped_biz
                                         + "\n\trelleno: " + ped_rell
                                         + "\n\tcover " + ped_cov
                                         + "\n\tdeoración: " + ped_deco
                                         + "\n\nPrecio final: "+ this.precioFinal +"Krs.")
    }

}



////////////////////////////////////////////////////////////////////////
// Activamos el boton que toca por tamanio
let inp_box_inp = document.getElementById("Inp_invitados")
let tamanioChica = document.getElementById("but_10x15");
let tamanioMediana = document.getElementById("but_15x15");
let tamanioGrande = document.getElementById("but_20x15");

inp_box_inp.addEventListener('input',  () => {
    let inv = inp_box_inp.value
    if (inv<=5) {
        tamanioChica.style = "background-color: #ff6b81"
        tamanioMediana.style = "background-color: #ffffff"
        tamanioGrande.style = "background-color: #ffffff"
    }
    else if (inv > 5 && inv <= 15) {
        tamanioChica.style = "background-color: #ffffff"
        tamanioMediana.style = "background-color: #ff6b81"
        tamanioGrande.style = "background-color: #ffffff"
    }
    else if (inv > 15 && inv <= 25) {
        tamanioChica.style = "background-color: #ffffff"
        tamanioMediana.style = "background-color: #ffffff"
        tamanioGrande.style = "background-color: #ff6b81"
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
        alert("Por favor, el numero de invitados tiene que ser un numero");
        // borde input rojo
    }
    else if (invitados>25) {
        alert("Para esta cantidad de invitados mejor envíanos un e-amil");
    }
    else {
        // 4) Calcular precio final 
        pedido.CalcPrecioFinal();

        // Confirmar pedido
        pedido.pedidoResumen();
    }
    
    DKK_calc_total.innerText = pedido.precioFinal + "DKK";

    // alert(convertDKK2EUR(pedido.precioFinal).then())


    // fetch('https://api.exchangerate-api.com/v4/latest/DKK')
    // .then((response) => response.json())
    // .then(data => {
    //     let exchangeRate = data.rates.EUR
    //     let precioEUR = pedido.precioFinal * exchangeRate
    //     EUR_calc_total.innerText = precioEUR + "EUR";
    //     });

    // const precioEUR = convertDKK2EUR(pedido.precioFinal)
    // alert(exchangeRate)

    // EUR_calc_total.innerText = precioEUR + "EUR";
    
});
////////////////////////////////////////////////////////////////////////

let butt_delivery = document.getElementById("butt_del")
let butt_pickup = document.getElementById("butt_pick")
let input_dirs = document.getElementById("Inp_direccion")

butt_del.addEventListener("click", () => {
    input_dirs.disabled = false
})
butt_pickup.addEventListener("click", () => {
    input_dirs.disabled = true
})

let butt_calc_delivery = document.getElementById("calc_delivery")

////////////////////////////////////////////////////////////////////////

// function convertDKK2EUR(amountDKK){ 
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '845a3cd433msh5ec8d780bc3f28ap117888jsnbeb8996795af',
//             'X-RapidAPI-Host': 'currencyconverter.p.rapidapi.com'
//         }
//     };

//         fetch('https://currencyconverter.p.rapidapi.com/?to=EUR&from=DKK&from_amount='+`${amountDKK}`, options)
//         .then((response) => response.json())
//         .then(response => {
//             const convertedAmount = response.to_amount
//             return convertedAmount
//         })
//         .catch(err => console.error(err));
// }
// alert(console.log(fetch('https://api.exchangerate-api.com/v4/latest/DKK')
//                     .then((response) => response.json())
//                     .then((response) => {console.log(response.rates.EUR)})
//                     ));

// function convertDKK2EUR(amountDKK) { 
//     let convertedAmount 
//     fetch('https://api.exchangerate-api.com/v4/latest/DKK')
//     .then((response) => response.json())
//     .then(data => {
//         const exchangeRate = data.rates.EUR
//         convertedAmount = amountDKK * exchangeRate
//         console.log(convertedAmount)
//         console.log(typeof convertedAmount)
//         console.log(data)
//         return data
//     })
//     .catch(err => console.error(err));
// }


// console.log(convertDKK2EUR(15).rates.EUR)





// alert(fetch('https://currencyconverter.p.rapidapi.com/?to=EUR&from=DKK&from_amount='+`${amountDKK}`))

////////////////////////////////////////////////////////////////////////








let exchangeRate
fetch('https://api.exchangerate-api.com/v4/latest/DKK')
.then((response) => response.json())
.then(data => {
    let exchangeRate = data.rates.EUR;
    let precioEUR = exchangeRate*(pedido.precioFinal)
    exchangeRate = document.createElement(exchangeRate);
    EUR_calc_total.innerText = precioEUR + "EUR";
    
    });
// const precioEUR = exchangeRate*(pedido.precioFinal)
alert(exchangeRate)

















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

