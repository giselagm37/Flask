const contenedorTarjetas = document.getElementBtId("productos-container");
const unidadesElement = document.getElementBtId("unidades");
const precioElemet = document.getElementBtId("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElemet =document.getElementById("totales");
const reiniciarCarritoElemt =document.getElementById("reiniciar")

const url = 'https://fakestoreapi.com/products'
fetch(url)
    .then(res=>res.json())
    .then(data=>{
        data.forEach(producto => {
            send(producto.title)
        })
    })
    .catch(err => console.log(err))



function crearTarjetasProductoInicio(){
        //verificamos que este vacio
        contenedorTarjetas.innerHTML= "";
        //para convertirlo de string a objeto o array
        const productos = JSON.parse(localStorage.getItem("items"));
        console.log(productos);
        //vemos si existe en memoria
        if (productos && productos.lenght > 0){
            productos.forEach((producto) => {
            const nuevoProducto = document.createElement("div");
            nuevoProducto.classList ="tarjeta-producto";
            nuevoProducto.innerHTML = `
                <img src="./img/productos/${producto.id}.jpg">
                <h3>${producto.nombre}</h3>
                <p>${producto.precio}</p>
                <div>
                    <button>-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button>+</button>
                <div>  
                `;
                //sumar
                contenedorTarjetas.appendChild(nuevoProducto);
                nuevoProducto
                    .getElementByTagName("button")[1]
                    //dentro del evento
                    .addEventListener("click",(e) => {
                    //e.target es el boton que selecciona el div que selecciona el spam
                    const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0]
                    //modifica la cuenta al agregar al carrito
                    cuentaElement.innerText =agregarAlCarrito(producto);
                    actualizarTotales();
                });
                    
                //restar
                nuevoProducto
                    .getElementByTagName("button")[0]
                    .addEventListener("click",(e) => {
                        restarAlCarrito(producto);
                        crearTarjetasProductoInicio();
                        actualizarTotales();
                    });
            });
        }
    }

    crearTarjetasProductoInicio();
    actualizarTotales();
//TOTALES
    function actualizarTotales(){
        const productos =JSON.parse(localStorage.getItem("items"));
        let unidades = 0;
        let precio = 0;
        //SI PRODUCTOS EXISTE
        if(productos && productos.lenght > 0 ){
            productos.forEach(producto => {
                //SE VAN SUMANDO
                unidades += producto.cantidad;
                precio += producto.precio* producto.cantidad;
            })
            unidadesElement.innerText = unidades;
            precioElement.innerText = precio;
        }
    }
    function revisarMensajeVacio(){
        const productos = JSON.parse(localStorage.getItem("items"));
        carritoVacioElement.classList.toggle("escondido", productos && productos.lenght > 0);
        totalesElement.classList.toggle("escondido", !(productos && productos.length > 0)); //se deja de mostrar
    }
    revisarMensajeVacio();

    //vaciar localstorage
    reiniciarCarritoElement.addEventListener("click",reiniciarCarrito);

    function reiniciarCarrito(){
        localStorage.removeItem("items");
        actualizarTotales();
        crearTarjetasProductoInicio();
    }