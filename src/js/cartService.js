// Funcionalidad del carrito

function agregarAlCarrito(producto) {
    // Preguntamos si hay algo en la memoria
    const memoria = JSON.parse(localStorage.getItem("data")) || []; 
    let cuenta = 0;

    // Revisa memoria
    const indiceProducto = memoria.findIndex(data => data.id === producto.id);

    // Si no lo encuentra
    if (indiceProducto === -1) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        memoria.push(nuevoProducto);
        cuenta = 1;
    } else {
        // Si lo encuentra, aumenta la cantidad
        memoria[indiceProducto].cantidad++;
        cuenta = memoria[indiceProducto].cantidad;
    }

    localStorage.setItem("data", JSON.stringify(memoria));
    actualizarNumeroCarrito();
    return cuenta;
}

// Restar
function restarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("data")) || []; 
    const indiceProducto = memoria.findIndex(data => data.id === producto.id);

    if (indiceProducto !== -1) {
        // Si en el índice de producto hay 1, tiene que borrar todo el elemento
        if (memoria[indiceProducto].cantidad === 1) {
            memoria.splice(indiceProducto, 1); // Quitar el elemento
        } else {
            memoria[indiceProducto].cantidad--;
        }
        localStorage.setItem("data", JSON.stringify(memoria));
    }

    actualizarNumeroCarrito();
}

/* Toma un producto, le agrega la cantidad 1 y lo devuelve */
function getNuevoProductoParaMemoria(producto) {
    // Crear una copia del producto para evitar modificar el original
    const nuevoProducto = { ...producto };
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito");

function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("data")) || []; 

    if (memoria.length > 0) {
        // Calcular la cuenta total
        const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
        cuentaCarritoElement.innerText = cuenta;
        console.log(cuenta);
    } else {
        cuentaCarritoElement.innerText = 0;
    }
}

// Cada vez que se recarga, el número está correcto
actualizarNumeroCarrito();


