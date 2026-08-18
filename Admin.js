fetch("https://localhost:44309/WSDeepfake.asmx/WSListadoUsuarios", {
    method: "POST",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({})
})
.then(response => response.json())
.then(data => {

    console.log("Usuarios recibidos:", data);

    const usuarios = JSON.parse(data.d);

    const cuerpoTabla = document.getElementById("cuerpoTabla");

    usuarios.forEach(usuario => {

        const fila = document.createElement("tr");

        const genero = usuario.GeneroId == 1
            ? "Hombre"
            : "Mujer";

        fila.innerHTML = `
            <td>${usuario.UsuarioId}</td>
            <td>${usuario.Nombre}</td>
            <td>${usuario.Apellido}</td>
            <td>${usuario.Correo}</td>
            <td>${usuario.Direccion}</td>
            <td>${usuario.NoDocumento}</td>
            <td>${genero}</td>
            <td>${usuario.Celular}</td>
        `;

        cuerpoTabla.appendChild(fila);
    });

})
.catch(error => {
    console.error("Error al cargar usuarios:", error);
});

const buscarNombre = document.getElementById("buscarNombre");

buscarNombre.addEventListener("input", function () {

    const texto = buscarNombre.value.toLowerCase();

    const filas = document.querySelectorAll("#tablaUsuarios tbody tr");

    filas.forEach(function (fila) {

        const nombre = fila.cells[1].textContent.toLowerCase();

        if (nombre.includes(texto)) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }

    });
});