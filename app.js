fetch("https://localhost:44309/WSDeepfake.asmx/WSListadoUsuariosJSON", {
    method: "GET"
})
.then(response => response.json())
.then(data => {
    console.log("Datos recibidos desde SQL Server:");
    console.log(data);
})
.catch(error => {
    console.error("Error al conectar con el Web Service:", error);
});


const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const correo = document.getElementById("correo");
const celular = document.getElementById("celular");
const genero = document.getElementById("genero");
const direccion = document.getElementById("direccion");
const cedula = document.getElementById("cedula");

console.log("nombre:", nombre);
console.log("apellido:", apellido);
console.log("correo:", correo);
console.log("celular:", celular);
console.log("genero:", genero);
console.log("direccion:", direccion);
console.log("cedula:", cedula);


document.getElementById("formRegistro").addEventListener("submit", function (event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const correo = document.getElementById("correo").value;
    const celular = document.getElementById("celular").value;
    const genero = document.getElementById("genero").value;
    const direccion = document.getElementById("direccion").value;
    const cedula = document.getElementById("cedula").value;

    // Convertimos Hombre/Mujer en el GeneroId de la base de datos
    let generoId;

    if (genero === "Hombre") {
        generoId = 1;
    } else if (genero === "Mujer") {
        generoId = 2;
    } else {
        alert("Seleccione un género");
        return;
    }

    fetch("https://localhost:44309/WSDeepfake.asmx/RegistrarUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            celular: celular,
            generoId: generoId,
            direccion: direccion,
            cedula: cedula
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del servidor:", data);
        alert("Usuario registrado correctamente");

        document.getElementById("formRegistro").reset();
    })
    .catch(error => {
        console.error("Error al registrar:", error);
        alert("Error al registrar el usuario");
    });
});