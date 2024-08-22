const limpiarformulario = () =>{
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
    boton.setAttribute("disabled", "");
}
export default limpiarformulario;