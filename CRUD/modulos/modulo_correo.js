// Validar correo electrónico
export const correoelectronico = (event, elemento) => {
    let validarcorreo = /^[\w-._+]+@[\w-._+]+\.[a-zA-Z]{2,}$/;

    if (elemento.value === "") {
        // Si el campo está vacío, simplemente marca como error sin mensaje
        elemento.classList.remove("correcto");
        elemento.classList.add("error");
    } else if (validarcorreo.test(elemento.value)) {
        // Si el correo es válido
        elemento.classList.remove("error"); // Quita la clase de error
        elemento.classList.add("correcto"); // Añade la clase de correcto
    } else {
        // Si el correo no es válido
        event.preventDefault(); // Evita el envío del formulario
        elemento.classList.remove("correcto"); // Quita la clase de correcto
        elemento.classList.add("error"); // Añade la clase de error
        alert("El correo electrónico ingresado no es válido."); // Muestra mensaje solo si el correo no es válido
    }
};
