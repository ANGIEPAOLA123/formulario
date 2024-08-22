// importanciones

import { correoelectronico } from "./modulos/modulo_correo.js";
import { sololetras } from "./modulos/modulos_letras.js";
import { solonumeros } from "./modulos/modulo_numeros.js";
import is_valid from "./modulos/modulo_valid.js";
import { remover } from "./modulos/modulo_validaciones.js";
import solicitud, { enviar } from "./modulos/modulo_usuarios.js";
import { URL } from "./modulos/config.js";
import limpiarformulario from "./modulos/modulo_limpiarformulario.js";
// variables 

// Selecciona el primer formulario (<form>) en el documento HTML. Lo asigna a la variable $formulario
const $formulario = document.querySelector("form");

// Selecciona los elementos del formulario por su ID. Cada uno se asigna a una variable
const nombres = document.querySelector("#nombres");
const apellidos = document.querySelector("#apellidos");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const tipodocumento = document.querySelector("#tipodocumento");
const documento = document.querySelector("#documento");
const correo = document.querySelector("#correo");
const politicas = document.querySelector("#politicas");
const boton = document.querySelector("#boton");
const tbody = document.querySelector("tbody");
const user = document.querySelector("#user");

// TEMPLATE, // Obtener el template y su contenido
const $template = document.querySelector("#template").content;

// FRAGMENTOS
const $fragmento = document.createDocumentFragment();


//  Se añade un listener al formulario que llama a la función validar cuando se intenta enviar el formulario.
// $formulario.addEventListener("submit", (event) => {
//     let response = is_valid(event, "form [required]")
//     // para hacer las peticiones 
//     // En lugar de pasar la ruta al recurso que deseas solicitar a la llamada del método fetch(), puedes crear un objeto de petición
//     // capturar todos los atributos

//     const data = {
//         nombres: nombres.value,
//         apellidos: apellidos.value,
//         telefono: telefono.value,
//         direccion: direccion.value,
//         tipodocumento: tipodocumento.value,
//         documento: documento.value,
//         correo: correo.value
//     }
//     if (response) {
//         fetch(`${URL}/users`, {
//           method: 'POST',
//           body: JSON.stringify(data), // se transforma a un json
//           headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//           },
//         })
//         .then((response) => response.json()) // se vuelve un objeto de js
//         .then(data => {
//             nombres.value = "";
//             apellidos.value = "";
//             telefono.value = "";
//             direccion.value = "";
//             documento.value = "";
//             correo.value = "";

//             nombres.classList.remove("correcto");
//             apellidos.classList.remove("correcto");
//             telefono.classList.remove("correcto");
//             direccion.classList.remove("correcto");
//             documento.classList.remove("correcto");
//             correo.classList.remove("correcto");

//             politicas.checked = false;

//             tipodocumento.value = "";
//             tipodocumento.classList.remove("correcto");

//             alert("Señor usuario tus datos fueron enviados exitosamente");

//             createRow(data);
            
//         })
//         .catch(error => {
//             alert("Señor usuario tus datos no fueron enviados");
//             console.error("error")
//         })
//         .finally(() => {
//             document.querySelector("#boton").disabled = false; // Habilitar el boton
//         });
//         document.querySelector("#boton").disabled = true; // Desabilitar el boton
//     }
// });

// GET se utiliza para obtener un recurso especifico del servidor
// POST se utiliza para crear un nuevo recurso en el servidor
// PUT se utiliza para actualizar un recurso exitente en el servidor
// DELETE se utiliza para eliminar un resurso especifico del servidor 

// keydown -- cuando ecribo tecla por tecla 
// keypress -- cuando la presiono
// keyup -- cuando la oprimo 

// Se añade un listener para el evento keyup en cada uno de los campos. Cuando se suelta una tecla, se llama a la función remover para verificar el estado del campo.
[nombres, apellidos, correo, telefono, direccion, documento].forEach(input => {
    input.addEventListener("keyup", () => {
        remover(input);
    });
});


// Manejar el cambio en el tipo de documento
// Al cambiar el valor del tipo de documento, se verifica si es diferente de "0". Se actualiza el estado visual del campo según corresponda.
tipodocumento.addEventListener("change", () => {
    if (tipodocumento.value === "") {
        // Si el valor es "0", significa que no se ha seleccionado un tipo de documento
        tipodocumento.classList.add("error");
        tipodocumento.classList.remove("correcto");
    } else {
        // Si el valor no es "0", significa que se ha seleccionado un tipo de documento
        tipodocumento.classList.remove("error");
        tipodocumento.classList.add("correcto");
    }
});

// AGREGANDO LA NUEVA OPTION AL SELECT
const documentos = () => {
    const fragment = document.createDocumentFragment();
    fetch('http://localhost:3000/documents')
    .then((response) => response.json())
    .then((data) => {

        let optiondeterminada = document.createElement("option"); // crear la opcion por defecto
        optiondeterminada.value = ""; // valor vacio para la opcion por defecto 
        optiondeterminada.textContent ="Selecciona el tipo de documento...";
        optiondeterminada.select = true; // para que quede selecciona como predeterminada
        fragment.appendChild( optiondeterminada); // se agrega la opcion por defecto al fragemen

        data.forEach(element => {
            //console.log(element);
            let option = document.createElement("option");
            option.value = element.id;
            option.textContent = element.nombre;
            fragment.appendChild(option);
        });
        tipodocumento.appendChild(fragment);
    })
}

// LISTAR LOS USUARIOS 
const listarUsuarios = async () => {
    const data = await solicitud("users");
    const documentos = await solicitud("documents");

    data.forEach(element => {
        
        const documento_nombre = documentos.find((documento) => documento.id === element.tipodocumento).nombre;
        
        $template.querySelector("tr").id = `user_${element.id}`;

       // Llenar los datos del usuario en el template clonado
       $template.querySelector('.nombre').textContent = element.nombres;
       $template.querySelector('.apellidos').textContent = element.apellidos;
       $template.querySelector('.correo_Electrónico').textContent = element.correo;
       $template.querySelector('.teléfono').textContent = element.telefono;
       $template.querySelector('.dirección').textContent = element.direccion;
       $template.querySelector('.tipo_de_documento').textContent = documento_nombre;
       $template.querySelector('.número_de_documento').textContent = element.documento;

       $template.querySelector(".modificar").setAttribute("data-id", element.id)
       $template.querySelector(".eliminar").setAttribute("data-id", element.id)


       // Clonar el contenido del template para usarlo
       const clone = document.importNode($template, true);

       $fragmento.appendChild(clone);
       
    });
    tbody.appendChild($fragmento);
}

const createRow = (data) => {
    const tr =  tbody.insertRow(-1);

    const tdnombre = tr.insertCell(0);
    const tdapellidos = tr.insertCell(1);
    const tdcorreo_Electrónico = tr.insertCell(2);
    const tdteléfono = tr.insertCell(3);
    const tddirección= tr.insertCell(4);
    const tdtipo_de_documento = tr.insertCell(5);
    const tdnúmero_de_documento = tr.insertCell(6);

    tdnombre.textContent = data.nombres;
    tdapellidos.textContent = data.apellidos;
    tdcorreo_Electrónico.textContent = data.correo;
    tdteléfono.textContent = data.telefono;
    tddirección.textContent = data.direccion;
    tdtipo_de_documento.textContent = data.tipodocumento;
    tdnúmero_de_documento.textContent = data.documento;
}

//
const save = (event) => {
    let response = is_valid(event, "form [required]");
    event.preventDefault();
    const data = {
        nombres: nombres.value,
        apellidos: apellidos.value,
        telefono: telefono.value,
        direccion: direccion.value,
        tipodocumento: tipodocumento.value,
        documento: documento.value,
        correo: correo.value
    }
    
    if(response) {
        if(user.value === ""){
            guardar(data)
        }else {
            actualiza(data)
        }
    }
    
}

const guardar = (data) => {
    fetch(`${URL}/users`, {
        method: 'POST',
        body: JSON.stringify(data), 
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json)=> {
        limpiarformulario();
        createRow(json)
    });
}

const actualiza = async (data) =>{
    //console.log(data);
    const response = await enviar (`users/${user.value}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    limpiarformulario(); // limpiamos el formulario 
    editRow(response); // modificamos el tr
}

const eliminar = async (element) => {
    const userId = element.dataset.id;
    const tr = document.querySelector(`#user_${userId}`);

    const userData = await enviar(`users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (userData) {
        const userName = userData.nombres; 

        const confirmDelete = confirm(`Desea eliminar a: ${userName}?`);

        if (confirmDelete) {
            const data = await enviar(`users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Elimina la fila de la tabla
            tr.remove();
        }
    } else {
        alert('No se pudo obtener la información del usuario.');
    }
};

// API es como un conjunto de instrucciones para comunicarse entre sistemas, mientras que API RESTful es como un conjunto de instrucciones específicas para comunicarse entre
// sistemas utilizando el protocolo HTTP, como un manual de instrucciones para una cosa específica.

// HTTP es un protocolo de solicitud-respuesta, lo que significa que un cliente(como un navegador web) envia una solicitud a un servidor y el servidor responde con los datos
// solicitados.

// - GET /Obtener lista de usuarios.
// - GET / Obtener usuario con ID 123.
// - POST / Crear nuevo usuario.
// - PUT / Actualizar usuario con ID 123.
// - DELETE / Eliminar usuario con ID 123.
// PATCH se utiliza para modificar una parte de un recurso existente (dejando otros aspectos del mismo sin modificar). 
// La operación PUT se utiliza para sustituir todo el contenido de un recurso existente por nuevos datos.

// Con setter, asignas un valor.
// Con getter, lo recibes.

// buscar datos y actualizar los campos del formulario
const buscar = async (elemento) => {
    try {
        // Obtén los datos directamente de la función enviar
        const data = await enviar(`users/${elemento.dataset.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        loadFrom(data);
    } catch (error) {
        console.error('Error al buscar datos:', error);
    }
}  

const editRow = (data) => {
    
    const tr = document.querySelector(`#user_${data.id}`);
    tr.querySelector('.nombre').textContent = data.nombres;
    tr.querySelector('.apellidos').textContent = data.apellidos;
    tr.querySelector('.correo_Electrónico').textContent = data.correo;
    tr.querySelector('.teléfono').textContent = data.telefono;
    tr.querySelector('.dirección').textContent = data.direccion;
    tr.querySelector('.tipo_de_documento').textContent = data.tipodocumento;
    tr.querySelector('.número_de_documento').textContent = data.documento;
}

const loadFrom = (data) => {
    const {
    id,
    nombres: user_nombres, // ALIAS
    apellidos: user_apellidos,
    telefono: user_telefono,
    direccion: user_direccion,
    tipodocumento: user_tipodocumento,
    documento: user_documento,
    correo: user_correo,
    } = data;

    // Actualiza los valores de los campos del formulario
    user.value = id;
    nombres.value = user_nombres;
    apellidos.value = user_apellidos;
    telefono.value = user_telefono;
    direccion.value = user_direccion;
    tipodocumento.value = user_tipodocumento;
    documento.value = user_documento;
    correo.value = user_correo;

    politicas.checked = true;
    boton.removeAttribute("disabled");
}

$formulario.addEventListener('submit', save );

// Manejar el estado del botón de enviar según el checkbox
addEventListener("DOMContentLoaded", (event) => {
    listarUsuarios();
    documentos();
    if(!politicas.checked) {
        boton.setAttribute("disabled", "");
    }
});

politicas.addEventListener("change", function (e) {
    if (e.target.checked) {
        boton.removeAttribute("disabled");
    } 
});

// Agrega el evento de submit al formulario
// document.querySelector("form").addEventListener("submit", validar);

// Validaciones específicas

// Validación del documento
documento.addEventListener("keypress", solonumeros);

// Validación del telefono
telefono.addEventListener("keypress", solonumeros);

// Validación del nombre 
nombres.addEventListener("keypress", (event) => {
    sololetras(event, nombres);
});

// Validación del apellido
apellidos.addEventListener("keypress", (event) => {
    sololetras(event, apellidos);
});

// Validación del correo electrónico
correo.addEventListener("blur", (event) => {
    correoelectronico(event, correo);
});

// EVENTO CLICK 
document.addEventListener("click", (event) => {
    if(event.target.matches(".modificar")){
        buscar(event.target);
    }
});
document.addEventListener("click", (event) => {
    if(event.target.matches(".eliminar")){
        eliminar(event.target);
    }
});

// toca hacer prmosas 
// formulario nuevvo que lleno el slecter
// colocarle un aleas a la destruraccion 