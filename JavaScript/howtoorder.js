



// let botonSize = document.getElementById("buttonss");

//     botonSize.addEventListener("click", respuestaClick)
//     function respuestaClick () {
//         console.log("respuestaTamanio");
//         if (botonSize == "true") {
//             alert("Su torta tendra un tamaño de ")
//         }
//     }

let tamanioChica = document.getElementById("button1");
let tamanioMediana = document.getElementById("button2");
let tamanioGrande = document.getElementById("button3");

tamanioChica.addEventListener("click", () => {
    alert("Su torta es chica");
});
tamanioMediana.addEventListener("click", () => {
    alert("Su torta es mediana");
});
tamanioGrande.addEventListener("click", () => {
    alert("Su torta es grande");
});

