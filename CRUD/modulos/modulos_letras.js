export const sololetras = (event, elemento) => {
    // console.log(elemento.value);
    let Letras = /^[a-zA-ZÀ-ÿ\s]+$/; // Letras y espacios, pueden llevar acentos
    if (Letras.test(event.key)) {
        console.log("si")
    } else {
        console.log("no")
        event.preventDefault();
    }
    // if(event.keyCode < 97 || event.keyCode > 122) 
    // event.preventDefault();
};
