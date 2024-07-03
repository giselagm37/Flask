
        const contenedorTarjetas = document.getElementById("productos-container");
        const unidadesElement = document.getElementById("unidades");
        const precioElement = document.getElementById("precio");
        const carritoVacioElement = document.getElementById("carrito-vacio");
        const totalesElement = document.getElementById("totales");
        const reiniciarCarritoElement = document.getElementById("reiniciar");

        function crearTarjetasProductoInicio() {
            contenedorTarjetas.innerHTML = "";
            const productos = JSON.parse(localStorage.getItem("data"));
            if (productos && productos.length > 0) {
                productos.forEach((producto) => {
                    const nuevoProducto = document.createElement("div");
                    nuevoProducto.classList = "tarjeta-producto";
                    nuevoProducto.innerHTML = `
                        <img src="${producto.image}" alt="${producto.nombre}">
                        <h3>${producto.nombre}</h3>
                        <p>$${producto.precio}</p>
                        <div>
                            <button>-</button>
                            <span class="cantidad">${producto.cantidad}</span>
                            <button>+</button>
                        </div>
                    `;
                    contenedorTarjetas.appendChild(nuevoProducto);
                    nuevoProducto.getElementsByTagName("button")[1].addEventListener("click", (e) => {
                        const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
                        cuentaElement.innerText = agregarAlCarrito(producto);
                        actualizarTotales();
                    });
                    nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", (e) => {
                        restarAlCarrito(producto);
                        crearTarjetasProductoInicio();
                        actualizarTotales();
                    });
                });
            }
        }

        crearTarjetasProductoInicio();
        actualizarTotales();

        function actualizarTotales() {
            const productos = JSON.parse(localStorage.getItem("data"));
            
            let unidades = 0;
            let precio = 0.0;
            if (productos && productos.length > 0) {
                productos.forEach(producto => {
                    unidades += producto.cantidad;
                    precio += producto.precio * producto.cantidad;
                });
                unidadesElement.innerText = unidades;
                precioElement.innerText = precio.toFixed(2);
            }
            
            revisarMensajeVacio();
        }

        function revisarMensajeVacio() {
            const productos = JSON.parse(localStorage.getItem("data"));
            carritoVacioElement.classList.toggle("escondido", productos && productos.length > 0);
            totalesElement.classList.toggle("escondido", !(productos && productos.length > 0));
        }

        reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);

        function reiniciarCarrito() {
            localStorage.removeItem("data");
            actualizarTotales();
            crearTarjetasProductoInicio();
        }

        function agregarAlCarrito(producto) {
            const memoria = JSON.parse(localStorage.getItem("data")) || []; 
            let cuenta = 0;
            const indiceProducto = memoria.findIndex(data => data.id === producto.id);
            if (indiceProducto === -1) {
                const nuevoProducto = getNuevoProductoParaMemoria(producto);
                memoria.push(nuevoProducto);
                cuenta = 1;
            } else {
                memoria[indiceProducto].cantidad++;
                cuenta = memoria[indiceProducto].cantidad;
            }
            localStorage.setItem("data", JSON.stringify(memoria));
            return cuenta;
        }

        function restarAlCarrito(producto) {
            const memoria = JSON.parse(localStorage.getItem("data")) || []; 
            const indiceProducto = memoria.findIndex(data => data.id === producto.id);
            if (indiceProducto !== -1) {
                if (memoria[indiceProducto].cantidad === 1) {
                    memoria.splice(indiceProducto, 1);
                } else {
                    memoria[indiceProducto].cantidad--;
                }
                localStorage.setItem("data", JSON.stringify(memoria));
            }
        }

        function getNuevoProductoParaMemoria(producto) {
            const nuevoProducto = { ...producto };
            nuevoProducto.cantidad = 1;
            return nuevoProducto;
        }



    