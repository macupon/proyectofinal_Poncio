


let botonSend = document.getElementById("sendForm");

botonSend.addEventListener("submit", validarFormulario);
function validarFormulario(e) {
    e.preventDefault();
    console.log("Formulario enviado");
    if (botonSend = true) {
        alert("Gracias por enviar su formulario")
    }
}




// botonSend.addEventListener("click", clickFormulario);
// function clickFormulario () {
//     console.log("Formulario 1");
// }

// let enviarForm = document.getElementById("enviarForm");
// botonSend.addEventListener("mouseup", () => {
//     botonSend.className.backgroundColor ='#000000';
// }); 

// let Form = document.getElementById("sendForm");

// Form.submit-button-wrapper.addEventListener("mouseup", () => {
//     // enviarForm.className.style.backgroundColor = '#000000';
//     Form.submit-button-wrapper.backgroundColor='#000000';
// }); 


// let but = document.getElementById("enviarForm");

// but.addEventListener("mouseup", () => {

//     but.style = "background-color: black"; 
//     // but.style.setProperty('background-color', 'blue');
//     // but.className='rosa';
      
// }); 

addEventListener("mouseup", () => {document.getElementById("enviarForm").style = "background-color: black"}); 



