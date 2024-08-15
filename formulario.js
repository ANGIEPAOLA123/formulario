
import { correoelectronico } from "./modulos/modulo correo.js";
import { sololetras } from "./modulos/modulos_letras.js";
import { solonumeros } from "./modulos/modulos_numeros.js";
import is_valid from "./modulos/modulo_valid.js";
import { remover } from "./modulos/modulo_validacion.js";
import solicitud, { enviar } from "./modulos/modulo_usuarios.js";
import { URL } from "./modulos/config.js";



const $formulario = document.querySelector("form");


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


const $template = document.querySelector("#template").content;

const $fragmento = document.createDocumentFragment();

$formulario.addEventListener("submit", (event) => {
    let response = is_valid(event, "form [required]")
   

    const data = {
        nombres: nombres.value,
        apellidos: apellidos.value,
        telefono: telefono.value,
        direccion: direccion.value,
        tipodocumento: tipodocumento.value,
        documento: documento.value,
        correo: correo.value
    }
    if (response) {
        fetch(`${URL}/users`, {
          method: 'POST',
          body: JSON.stringify(data), 
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => response.json()) 
        .then(data => {
            console.log(data);
            nombres.value = "";
            apellidos.value = "";
            telefono.value = "";
            direccion.value = "";
            documento.value = "";
            correo.value = "";

            nombres.classList.remove("correcto");
            apellidos.classList.remove("correcto");
            telefono.classList.remove("correcto");
            direccion.classList.remove("correcto");
            documento.classList.remove("correcto");
            correo.classList.remove("correcto");

            politicas.checked = false;

            tipodocumento.value = "";
            tipodocumento.classList.remove("correcto");

            alert("Señor usuario tus datos fueron enviados exitosamente");

            createRow(data);
            
        })
        .catch(error => {
            alert("Señor usuario tus datos no fueron enviados");
            console.error("error")
        })
        .finally(() => {
            document.querySelector("#boton").disabled = false; // Habilitar el boton
        });
        document.querySelector("#boton").disabled = true; // Desabilitar el boton
    }
});


[nombres, apellidos, correo, telefono, direccion, documento].forEach(input => {
    input.addEventListener("keyup", () => {
        remover(input);
    });
});



tipodocumento.addEventListener("change", () => {
    if (tipodocumento.value === "") {
       
        tipodocumento.classList.add("error");
        tipodocumento.classList.remove("correcto");
    } else {
        
        tipodocumento.classList.remove("error");
        tipodocumento.classList.add("correcto");
    }
});

const documentos = () => {
    const fragment = document.createDocumentFragment();
    fetch('http://localhost:3000/documento')
    .then((response) => response.json())
    .then((data) => {

        let optiondeterminada = document.createElement("option"); 
        optiondeterminada.value = ""; 
        optiondeterminada.textContent ="Selecciona el tipo de documento...";
        optiondeterminada.select = true; 
        fragment.appendChild( optiondeterminada); 

        data.forEach(element => {
            console.log(element);
            let option = document.createElement("option");
            option.value = element.id;
            option.textContent = element.nombre;
            fragment.appendChild(option);
        });
        tipodocumento.appendChild(fragment);
    })
}


const listarUsuarios = async () => {
    const data = await solicitud("users");
    const documentos = await solicitud("documento");

    data.forEach(element => {
        
        const documento_nombre = documentos.find((documento) => documento.id === element.tipodocumento).nombre;

       
       $template.querySelector('.nombre').textContent = element.nombres;
       $template.querySelector('.apellidos').textContent = element.apellidos;
       $template.querySelector('.correo_Electrónico').textContent = element.correo;
       $template.querySelector('.teléfono').textContent = element.telefono;
       $template.querySelector('.dirección').textContent = element.direccion;
       $template.querySelector('.tipo_de_documento').textContent = documento_nombre;
       $template.querySelector('.número_de_documento').textContent = element.documento;

       $template.querySelector(".modificar").setAttribute("data-id", element.id)
       $template.querySelector(".eliminar").setAttribute("data-id", element.id)


    
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

        // Actualiza los valores de los campos del formulario
        nombres.value = data.nombres || '';
        apellidos.value = data.apellidos || '';
        telefono.value = data.telefono || '';
        direccion.value = data.direccion || '';
        tipodocumento.value = data.tipodocumento || '';
        documento.value = data.documento || '';
        correo.value = data.correo || '';

        console.log(data);
    } catch (error) {
        console.error('Error al buscar datos:', error);
    }
}    

const actualizarDatos = async () => {
    
};


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

