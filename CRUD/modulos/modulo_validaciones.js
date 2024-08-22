// Función que elimina la clase error de un campo de entrada (input)
const quitarClase = (input) => {
    // Quita la clase 'error' del campo de entrada
    input.classList.remove("error");
    
    // Construye el selector CSS dinámicamente basado en el id del input
    const errorElement = document.querySelector(`#${input.id}-error`);
    
    // Si existe el elemento de mensaje de error, limpia su contenido
    if (errorElement) {
        errorElement.textContent = "";
    }
};

// Función de validación
const validar = (event) => {
    event.preventDefault(); // Evita el envío automático del formulario
    let valid = true; // Variable que indica si el formulario es válido

    // Validación del campo nombres
    if (nombres.value === "") {
        nombres.focus(); // Enfoca el campo
        nombres.classList.add("error"); // Añade la clase de error
        document.querySelector("#nombres-error").textContent = "Por favor, ingresa tus nombres."; // Muestra mensaje de error
        valid = false; // Indica que el formulario no es válido
    } else {
        quitarClase(nombres); // Quita la clase de error si el campo es válido
    }

    // Validación del campo apellidos
    if (apellidos.value === "") {
        apellidos.focus();
        apellidos.classList.add("error");
        document.querySelector("#apellidos-error").textContent = "Por favor, ingresa tus apellidos.";
        valid = false;
    } else {
        quitarClase(apellidos);
    }

    // Validación del campo correo electrónico
    if (correo.value === "") {
        correo.focus();
        correo.classList.add("error");
        document.querySelector("#correo-error").textContent = "Por favor, ingresa tu correo electrónico.";
        valid = false;
    } else {
        quitarClase(correo);
    }

    // Validación del campo teléfono
    if (telefono.value === "") {
        telefono.focus();
        telefono.classList.add("error");
        document.querySelector("#telefono-error").textContent = "Por favor, ingresa tu teléfono.";
        valid = false;
    } else {
        quitarClase(telefono);
    }

    // Validación del campo dirección
    if (direccion.value === "") {
        direccion.focus();
        direccion.classList.add("error");
        document.querySelector("#direccion-error").textContent = "Por favor, ingresa tu dirección.";
        valid = false;
    } else {
        quitarClase(direccion);
    }

    // Validación del campo número de documento
    if (documento.value === "") {
        documento.focus();
        documento.classList.add("error");
        document.querySelector("#documento-error").textContent = "Por favor, ingresa tu número de documento.";
        valid = false;
    } else {
        quitarClase(documento);
    }

    // Validación del campo tipo de documento
    if (tipodocumento.value === "0") {
        tipodocumento.focus();
        tipodocumento.classList.add("error");
        document.querySelector("#tipodocumento-error").textContent = "Por favor, selecciona un tipo de documento.";
        valid = false;
    } else {
        quitarClase(tipodocumento);
    }

    // Validación del campo políticas de uso
    if (!politicas.checked) {
        document.querySelector("#politicas-error").textContent = "Debes aceptar las políticas de uso.";
        valid = false;
    } else {
        document.querySelector("#politicas-error").textContent = "";
    }

    // Si todos los campos son válidos, muestra un mensaje de éxito
    if (valid) {
        alert("Formulario enviado");
    }
};

// Función que agrega o quita la clase correcto dependiendo de si el campo tiene un valor
export const remover = (input) => {
    if (input.value !== "") {
        input.classList.add("correcto"); // Añade la clase correcto
        input.classList.remove("error"); // Quita la clase error
        
    } else {
        input.classList.remove("correcto");
        input.classList.add("error");
    }
};

// if (input.value !== "") {
//    input.classList.add("correcto"); // Añade la clase correcto
//    input.classList.remove("error"); // Quita la clase error
//    document.querySelector(#${input.id}-error).textContent = ""; // Limpia el mensaje de error
//} else {
//    input.classList.remove("correcto");
//    input.classList.add("error");
//}
//};