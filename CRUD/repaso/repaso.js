// EXPRECIONES REGULARES PARA VALIDAR CADA CAMPO 

// // validar nombre
// let ValidarNombre = /^[a-zA-Z]{4,}$/; //sicurplejo alt 94

// // validar apellido 
// const ValidarApellido = /^[a-zA-Z\s]{4,}$/;
// const ValidarApellido1 = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]{4,}$/;

// // validar telefono
// const telefonoRegex = /^\d{10}$/; // 10 dígitos, sin espacios ni caracteres especiales

// // validar dirrecion
// const ValidarDireccion = /^[a-zA-Z0-9\s,.'-]{3,}$/; // Letras, números, espacios, comas, puntos y guiones

// // validar documento
// const ValidarDocumento = /^[0-9]{8,10}$/;  // Entre 8 y 10 dígitos

// Manejar el estado del botón de enviar según el checkbox
// boton.setAttribute('disabled', '');

// politicas.addEventListener("change", () => {
//     if (politicas.checked) {
//         boton.removeAttribute("disabled");
//     } else {
//         boton.setAttribute("disabled", "disabled");
//     }
// });

// boton.addEventListener('click', function(){
//     alert("Debes aceptar las políticas de uso");
// })

// nombres.addEventListener("keypress", (event) => {
//     console.log(event);
//     console.log(this.value);
// });


// darlyhernadez0624@gmail.com
// usuario@.com

// w son los alfa numericos chorgan
// W son los que no son alfa numericos
// agrupavamos en una expresion regular
// \ baquelas
// ^: Inicio de la cadena. //sicurplejo alt 94
// [a-zA-Z0-9_.+-]+: Uno o más caracteres permitidos antes de '@' (letras, dígitos, '.', '_', '+', '-').
// @: Obligatorio, separa la parte local del dominio.
// [a-zA-Z0-9-]+: Uno o más caracteres permitidos para el dominio antes del primer punto (letras, dígitos, '-').
// .: Punto literal, separa las partes del dominio.
// [a-zA-Z0-9-.]+: Uno o más caracteres permitidos después del punto (letras, dígitos, '-', '.').
// $: Fin de la cadena.


// const solonumeros = function(event) {
//     if (!ValidarDocumento.test(event.value)) {
//         documento.focus();
//         documento.classList.add("error");
//         event.preventDefault(); // no premite que se ingresa el elemento
//         alert("Solo se permiten numeros")
//     } else {
//         quitarClase(documento);
//     }
// };

// documento.addEventListener("keypress", solonumeros);


// cuando pulsamos una tecla
// documento.addEventListener("keypress", function (event) {
//     // console.log(event.keyCode)
//     // if(event.keyCode >= 48 && event.keyCode <= 57) {
//     // } else {
//     //     event.preventDefault(); // no premite que se ingresa el elemento
//     //     alert("Solo se permiten numeros")
//     // }
//     if (!ValidarDocumento.test(documento.value)) {
//         documento.focus();
//         documento.classList.add("error");
//         event.preventDefault(); // no premite que se ingresa el elemento
//         alert("Solo se permiten numeros")
//     } else {
//         quitarClase(documento);
//     }
// });

// // mientras mantenemos pulsada la tecla
// documento.addEventListener("keydown", function (event) {
//     // console.log(event)
// });

// // mientras soltamos una tecla
// documento.addEventListener("keyup", function (event) {
//     // console.log(event)
// });

// evento blur para el focus 
/* <script>
function añadirAficion(){
  let documento = document.querySelector("#tipodocumento");
  let inputnueva = document.querySelector("#inputnueva").value;
  let option = document.createElement("option");
  option.text = inputnueva;
  documento.add(option);
}
</script> */