

import { correoelectronico } from "./modulos/modulo_correo.js";
import { sololetras } from "./modulos/modulos_letras.js";
import { solonumeros } from "./modulos/modulo_numeros.js";
import is_valid from "./modulos/modulo_valid.js";
import { remover } from "./modulos/modulo_validaciones.js";
import solicitud, { enviar } from "./modulos/modulo_usuarios.js";
import { URL } from "./modulos/config.js";
import limpiarformulario from "./modulos/modulo_limpiarformulario.js";

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
const user = document.querySelector("#user");


const $template = document.querySelector("#template").content;


const $fragmento = document.createDocumentFragment();

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
    fetch('http://localhost:3000/documents')
    .then((response) => response.json())
    .then((data) => {

        let optiondeterminada = document.createElement("option"); 
        optiondeterminada.value = ""; 
        optiondeterminada.textContent ="Selecciona el tipo de documento...";
        optiondeterminada.select = true; 
        fragment.appendChild( optiondeterminada); 

        data.forEach(element => {
            let option = document.createElement("option");
            option.value = element.id;
            option.textContent = element.nombre;
            fragment.appendChild(option);
        });
        tipodocumento.appendChild(fragment);
    })
}


const listarUsuarios = async (page) => {
    const _page = page ? page : 1;
    const data = await solicitud(`users?_page=${_page}&_per_page=5`);
    const documentos = await solicitud("documents");

    console.log(data)

    const nav = document.querySelector(".navegacion");

    const first = data.first;
    const prev = data.prev;
    const next = data.next;
    const last =  data.last;

    console.log("first" , first);
    console.log("prev" , prev);
    console.log("next" , next);
    console.log("last" , last);

    nav.querySelector(".first").disabled = prev ? false : true;
    nav.querySelector(".prev").disabled = prev ? false : true;
    nav.querySelector(".next") .disabled = next ? false : true;
    nav.querySelector(".last") .disabled = next ? false : true;


    nav.querySelector(".first").setAttribute("data-first" , first);
    nav.querySelector(".prev").setAttribute("data-prev" , prev); 
    nav.querySelector(".next").setAttribute("data-next" , next);
    nav.querySelector(".last").setAttribute("data-last",last);

    data.data.forEach(element => {
        
        const documento_nombre = documentos.find((documento) => documento.id === element.tipodocumento).nombre;
        
        $template.querySelector("tr").id = `user_${element.id}`;

    
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
    const response = await enviar (`users/${user.value}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    limpiarformulario(); 
    editRow(response); 
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

            
            tr.remove();
        }
    } else {
        alert('No se pudo obtener la información del usuario.');
    }
};


const buscar = async (elemento) => {
    try {
        
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
    nombres: user_nombres, 
    apellidos: user_apellidos,
    telefono: user_telefono,
    direccion: user_direccion,
    tipodocumento: user_tipodocumento,
    documento: user_documento,
    correo: user_correo,
    } = data;

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


documento.addEventListener("keypress", solonumeros);


telefono.addEventListener("keypress", solonumeros);


nombres.addEventListener("keypress", (event) => {
    sololetras(event, nombres);
});


apellidos.addEventListener("keypress", (event) => {
    sololetras(event, apellidos);
});


correo.addEventListener("blur", (event) => {
    correoelectronico(event, correo);
});


document.addEventListener("click", (event) => {
    if(event.target.matches(".modificar")){
        buscar(event.target);
    }
});
document.addEventListener("click", (event) => {
    if(event.target.matches(".eliminar")){
        eliminar(event.target);    
    }
    if(event.target.matches(".first")){
        const nodos = tbody;
        const first= event.target.dataset.first;

        while (nodos.firstChild){
            nodos.removeChild(nodos.firstChild)
        }

        listarUsuarios(first);
    }
    if(event.target.matches(".prev")){
        const nodos = tbody;
        const prev= event.target.dataset.prev;

        while (nodos.firstChild){
            nodos.removeChild(nodos.firstChild)
        }

        listarUsuarios(prev);
    }
    if(event.target.matches(".next")){
        const nodos = tbody;
        const next= event.target.dataset.next;

        while (nodos.firstChild){
            nodos.removeChild(nodos.firstChild)
        }

        listarUsuarios(next);
    }
   
    if(event.target.matches(".last")){
        const nodos = tbody;
        const last = event.target.dataset.last;

        while (nodos.firstChild){
            nodos.removeChild(nodos.firstChild)
        }

        listarUsuarios(last);
    }


});

