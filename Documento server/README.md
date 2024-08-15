# INSTALACIÓN Y USO DE JSON SERVER

Paso 1: Verificar la versión de Node.js
Abre Git Bash y verifica la versión actual de Node.js con el siguiente comando: 

```
node -v
```

Paso 2: Instalación de Node.js

Si la versión no es la requerida (v20.15.0), descarga Node.js desde el sitio oficial:

1.Abre tu navegador y busca "Node.js".

```
Node.js
```

PASO 3: Instalación de Node.js

1.Selecciona el primer resultado y descarga la versión adecuada.

2.Ejecuta el instalador descargado, siguiendo las instrucciones de instalación estándar. (esperamos unos minutos a que se descargue, despues de que ya lo tengamos descargado, lo abrimos y como normalmente se va a instalar algo, empezamos a darle Next a todo y al final sale para instalar).

3.Reiniciamos nuestro computador para que la version si se nos actualice, despues de hacer, volvemos abrir la consola Git Bash, escribimos el primer comando para ver que version tenemos y ya nos deberia salir la version (v20.15.0) y si esto nos sale es que se instalo correctamente nuestra version

PASO 4: Ahora lo que vamos hacer es a instalar demanera global json-server y que nos funcione en todo el computador.

PASO 5: Instalación global de JSON Server

1.Abre tu navegador y busca "JSON Server".

2.Accede al sitio oficial y consulta la sección de instalación.

```
json server
```

3.Ejecuta el siguiente comando en Git Bash para instalar JSON Server globalmente:

```
npm install -g json-server
```

PASO 6: Creación del entorno de trabajo

1.Crea una nueva carpeta llamada "server" desde Git Bash:

```
cd d:
mkdir server
cd server/
```

2.Abre Visual Studio Code en la carpeta recién creada:

```
code .
```

PASO 7: Preparación del archivo JSON

1.Crea un archivo llamado db.json en la carpeta "server".
Copia y pega el contenido del archivo JSON que desees simular o podemos copiar el archio que nos aparece en la pagina, para que sigamos con la explicacion y podamos observar.

```
db.json 
```

PASO 8: Activación de JSON Server

En Git Bash, ejecuta el siguiente comando para activar JSON Server con tu archivo db.json:

```
npx json-server db.json
```

PASO 9: Acceso a JSON Server desde el navegador

1.Abre tu navegador web y visita:

```
localhost:3000
```

2.Aquí podrás ver y interactuar con los datos del archivo JSON simulado.

Aqui podemos visualizar una ventana que dice JSON Server y podemos observar los archivos json que nosotros hemos colocado, le damos click ahi y nos va a mostrar el archivo json

PASO 10: Detener JSON Server

Para detener JSON Server, presiona Ctrl + C en la terminal donde se está ejecutando.

Notas adicionales:

1.Asegúrate de que JSON Server esté activo siempre que desees acceder a los datos simulados.

2.Puedes practicar con diferentes archivos JSON para explorar diversas simulaciones.



# EXPLICACION PARA INTEGRAR JSON SEVER EN TU APLICACION WEB:

Paso 1: Definición del Módulo modulo.js

En este paso, creas un módulo JavaScript (modulo.js) que contendrá una función para interactuar con los datos del servidor JSON.

1.Creación del Archivo modulo.js:

Crea un archivo llamado modulo.js en tu proyecto.

2.Definición de la Función obtenerUsuarios:

En modulo.js, define una función llamada obtenerUsuarios.
Dentro de esta función, utiliza fetch para hacer una solicitud HTTP GET al servidor JSON. 

Por ejemplo, para obtener usuarios desde http://localhost:3000/users.

3.Parseo de la Respuesta:

Usa await con fetch para esperar la respuesta del servidor.

Convierte la respuesta en formato JSON usando el método json().

4.Retorno de Datos:

Retorna los datos obtenidos del servidor JSON.

# ESTO SOLO ES UN EJEMPLO DE COMO PODRIA SER, YA QUE DEPENDE DE COMO LO QUEREMOS HACER, ESTO SOLO ES UNA BASE

```
export const usuarios = async () => {
  const lista = await fetch("http://localhost:3000/users")
  const usuarios = await lista.json();
  return usuarios;
}
```

Paso 2: Archivo Principal (por ejemplo, index.js)

En este paso, importas la función obtenerUsuarios desde modulo.js y utilizas esta función para obtener y mostrar los datos en tu interfaz web.

1.Importación de la Función:

En tu archivo principal (como index.js), importa la función obtenerUsuarios desde modulo.js. Esto se hace usando import.

2.Obtención de Datos y Renderización:

Llama a obtenerUsuarios() para obtener los datos del servidor JSON.
Utiliza then() para manejar la promesa y trabajar con los datos una vez que estén disponibles.

Itera sobre los datos recibidos (por ejemplo, un array de usuarios) usando forEach().

3.Uso de Templates HTML:

Define un template HTML en tu documento principal (puede ser un <template> en tu HTML o un elemento <template> clonado en JavaScript).

Dentro del bucle forEach(), llena el template con los datos de cada usuario obtenido.

4.Clonado y Renderización:

Usa document.importNode() para clonar el contenido del template.

Llena el contenido clonado con los datos específicos del usuario.

Agrega el contenido clonado a tu documento HTML, por ejemplo, mediante appendChild().

# ESTO SOLO ES UN EJEMPLO DE COMO PODRIA SER, YA QUE DEPENDE DE COMO LO QUEREMOS HACER, ESTO SOLO ES UNA BASE

```
// "use strict";
import { usuarios } from "./modulo.js";
const $root = document.querySelector("#root");

// TEMPLATE, // Obtener el template y su contenido
const $template = document.querySelector("#template").content;

// FRAGMENTOS
const $card = document.createDocumentFragment();

// const $div = document.createElement("div");
// const $p = document.createElement("p");
// let texto = "Este seria el texto del elemento"

// // $div.textContent = texto;

// $div.classList.add("box");

// $p.textContent = texto;
// // $p.classList.add("box__texto");

// $root.appendChild($div);
// $div.appendChild($p);

// const $texto = document.createTextNode("Este seria el texto del elemento");


usuarios().then((listado) => {

  listado.forEach(usuario => {
    // const $div = document.createElement("div");
    // $div.classList.add("box", "border"); // agregar estilos

    // const $pid = document.createElement("p");
    // $pid.textContent = `Id: ${usuario.id}`;
    // $div.appendChild($pid);
    
    // const $h2 = document.createElement("h2");
    // $h2.textContent = usuario.name;
    // $div.appendChild($h2);

    // const $pUsername = document.createElement("p");
    // $pUsername.textContent = `Username: ${usuario.username}`;
    // $div.appendChild($pUsername);

    // const $pEmail = document.createElement("p");
    // $pEmail.textContent = `Email: ${usuario.email}`;
    // $div.appendChild($pEmail);

    // const $pAddress = document.createElement("p");
    // $pAddress.textContent = `Adress: ${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}, ${usuario.address.zipcode} `;
    // $div.appendChild($pAddress);

    // const $pGeo = document.createElement("p");
    // $pGeo.textContent = `Geo: ${usuario.address.geo.lat}, ${usuario.address.geo.lng} `;
    // $div.appendChild($pGeo);

    // const $pPhone = document.createElement("p");
    // $pPhone.textContent = `Phone: ${usuario.phone}`;
    // $div.appendChild($pPhone);

    // const $pWebsite = document.createElement("p");
    // $pWebsite.textContent = `Website: ${usuario.website}`;
    // $div.appendChild($pWebsite);

    // const $pCompany = document.createElement("p");
    // $pCompany.textContent = `Company: ${usuario.company.name}, ${usuario.company.catchPhrase}, ${usuario.company.bs} `;
    // $div.appendChild($pCompany);

    // Llenar los datos del usuario en el template clonado
    // $template.querySelector("h2").textContent = usuario.name;
    // $template.querySelector("div > p").textContent = usuario.email;
    // $template.querySelector("div > p ~ p").textContent = usuario.username;

    // Llenar los datos del usuario en el template clonado
    $template.querySelector('.user-name').textContent = usuario.name;
    $template.querySelector('.user-username').textContent = usuario.username;
    $template.querySelector('.user-email').textContent = usuario.email;
    $template.querySelector('.user-address').textContent = `${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}, ${usuario.address.zipcode}`;
    $template.querySelector('.user-geo').textContent = `${usuario.address.geo.lat}, ${usuario.address.geo.lng}`;
    $template.querySelector('.user-phone').textContent = usuario.phone;
    $template.querySelector('.user-website').textContent = usuario.website;
    $template.querySelector('.user-company').textContent = `${usuario.company.name}, ${usuario.company.catchPhrase}, ${usuario.company.bs}`;

    // Clonar el contenido del template para usarlo
    let clone = document.importNode($template, true)

    $card.appendChild(clone)

  });
  $root.appendChild($card);
}).catch();
```