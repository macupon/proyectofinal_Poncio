
// Accedemos a los elementos del formulario (h5, form e input), del HTML(contactus), utilizando su atributo id
let botonSend = document.getElementById("sendForm");
let contactmilo = document.getElementById("contactmilo");
let enviarForm = document.getElementById("enviarForm");

// Accedemos a los elementos del formulario (inputs y textarea), del HTML(contactus), utilizando su atributo id
let idname = document.getElementById("name");
let idemail = document.getElementById("emailForm");
let idmess =  document.getElementById("message"); 


// Creamos el evento "click" del boton, el cual tiene "envarForm" como id
enviarForm.addEventListener("click", () => {
    // Creamos una Array vacia, que contendra todos los campos no completados por el usuario
    let arrayForm = [];
    idname.value === "" && arrayForm.push(idname.placeholder);
    idemail.value === "" && arrayForm.push(idemail.placeholder);
    idmess.value === "" && arrayForm.push(idmess.placeholder);

    arrayForm.length != 0 ? Swal.fire('Tiene que completar los siguientes campos: ' + arrayForm) : (contactmilo.innerText = "Formulario Enviado!", enviarForm.style = "background-color: #778beb", 
                                                                        setTimeout(()=> {enviarForm.style = "background-color: #c44569"}, 2000))
    
})
