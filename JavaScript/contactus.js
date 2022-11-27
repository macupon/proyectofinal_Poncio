
// Accedemos a los elementos del formulario (h5, form e input), del HTML(contactus), utilizando su atributo id
let botonSend = document.getElementById("sendForm");
let contactmilo = document.getElementById("contactmilo");
let enviarForm = document.getElementById("enviarForm");

// Accedemos a los elementos del formulario (inputs y textarea), del HTML(contactus), utilizando su atributo id
let idname = document.getElementById("name");
let idemail = document.getElementById("emailForm");
let idmess =  document.getElementById("message"); 


// Creamos el evento "click"
enviarForm.addEventListener("click", () => {
    let arrayForm = [];

    // Creamos una Array vacia, que contendra todos los campos no completados por el usuario
    if (idname.value === ""){
        arrayForm.push(idname.placeholder)
    }
    if (idemail.value ===""){
        arrayForm.push(idemail.placeholder)
    }
    if (idmess.value === "") {
        arrayForm.push(idmess.placeholder)
    }

    // Pedimos que complete los campos vacios
    if (arrayForm.length != 0 ) {
        alert(`Completa los campos: ${arrayForm}`);
    }

    // Si la array se encuentra vacia al enviar el formulario, se modificara el color del boton "send" y el titulo
    else {
        contactmilo.innerText = "Formulario Enviado!"
        enviarForm.style = "background-color: #f8a5c2"
    }



})


