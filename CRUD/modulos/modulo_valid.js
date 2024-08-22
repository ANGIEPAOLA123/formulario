import { correoelectronico } from "../modulos/modulo_correo.js";

const is_valid = (event, form) => {
  event.preventDefault(); // Evita el envío automático del formulario
  const elementos = document.querySelectorAll(form);
  let todosLlenos = true;

  elementos.forEach(elemento => {
    if (elemento.type === "email") {
      // Verifica si el tipo del elemento es 'email'.
      // Esto asegura que solo se aplique la validación específica para campos de correo electrónico.
      // 'type' es una propiedad del elemento HTML que indica el tipo de campo de entrada. En este caso, verifica si el tipo de campo es 'email'.
    
    correoelectronico(event, elemento); // Llama a la función 'correoelectronico' para validar el contenido del campo de correo electrónico.
    
    // Comprueba si el elemento tiene la clase 'error', que indica que la validación falló.
    // Método 'contains': Se usa para determinar si un elemento tiene una clase específica en su lista de clases.
    if (elemento.classList.contains("error")) {
        // Si el campo tiene la clase 'error', significa que el correo electrónico no es válido.
        todosLlenos = false; // Marca el formulario como no válido.
    } else {
        // Si el campo no tiene la clase 'error', el correo electrónico es válido.
        elemento.classList.add("correcto"); // Añade la clase 'correcto' al campo para indicar que es válido.
      }
    }
    
    else {
    // Validación general para otros campos de entrada
    if (elemento.value === "") {
      elemento.classList.add("error");
      todosLlenos = false;
    } else {
      elemento.classList.remove("error");
      elemento.classList.add("correcto");
    }
  }
});

  if (todosLlenos) {
    alert("Correcto, todos los campos están llenos y validados");
  } else {
    alert("Incorrecto, algunos campos están vacíos o no son válidos");
  }
  return todosLlenos;
};

export default is_valid;

// Uso: element.classList.contains('nombre-de-clase')
// Propósito: Verificar si un elemento HTML tiene una clase específica.
// Retorna: true si el elemento tiene la clase; false si no la tiene.