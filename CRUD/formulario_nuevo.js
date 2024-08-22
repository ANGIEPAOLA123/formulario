import { sololetras } from "./modulos/modulos_letras.js";
import is_valid from "./modulos/modulo_valid.js";
import { remover } from "./modulos/modulo_validaciones.js";

const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const boton = document.querySelector("#boton");



nombre.addEventListener("keypress", (event) => {
    sololetras(event, nombre);
});

$formulario.addEventListener("submit", (event) => {
  let response = is_valid(event, "form [required]");
  const data = {
    nombre: nombre.value,
  }
  if (response) {
    boton.setAttribute("disabled", "");

    fetch('http://localhost:3000/documents', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
      'Content-type': 'application/json; charset=UTF-8',
      },
    })
      
    .then((response) => response.json())
    .then((json) => {
      nombre.value = "";
      nombre.classList.remove("correcto");
      boton.removeAttribute("disabled");
    })
  }
});


[nombre].forEach(input => {
  input.addEventListener("keyup", () => {
      remover(input);
  });
});