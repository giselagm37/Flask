// Selecciona el contenedor donde se agregarán las tarjetas de producto
const contenedorTarjetas = document.getElementById("productos-container");

// URL de la API
const url = 'https://fakestoreapi.com/products';

// Función para crear tarjetas de productos
function crearTarjetasProductoInicio(productos) {
    productos.forEach(producto => {
        // Creo un elemento <div> para cada producto
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList.add("tarjeta-producto");

        // Inserto el contenido HTML en el <div>
        nuevoProducto.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p>Precio: $${producto.price}</p>
            <button>Agregar al carrito</button>
        `;

        // Agrego el <div> al contenedor de tarjetas
        contenedorTarjetas.appendChild(nuevoProducto);

        // Agrego un event listener al botón
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto));
    });
}
//envio el array de donde tiene que cargar
//crearTarjetasProductoInicio(productos) //item?
// Función para agregar productos al carrito (debe estar definida)
function agregarAlCarrito(producto) {
    console.log(`Producto agregado al carrito: ${producto.title}`);
    // Aquí puedes añadir la lógica para agregar el producto al carrito
}

// Fetch para obtener los productos de la API
fetch(url)
    .then(res => res.json())
    .then(data => {
        crearTarjetasProductoInicio(data);
    })
    .catch(err => console.log(err));




// Selecciona el contenedor donde se agregarán las tarjetas de producto
/*const contenedorTarjetas = document.getElementBtId("productos-container")
//recibe array DE PRODUCTOS
const url = 'https://fakestoreapi.com/products'

function crearTarjetasProductoInicio(productos){ //lee el array y crea
    //ciclamos LOS PRODUCTOS
    productos.forEach(producto => {   
        //creo un elemento por cada uno          
        const nuevoProducto = document.createElemt("div"); //creo un elemento
        nuevoProducto.classList ="tarjeta-producto";
        //lo que va en cada tarjeta agrego cada producto
        nuevoProducto.innerHTML = `                    
        <img src="./img/productos/${producto.image}.jpg">
        <h3>${producto.title}</h3>
        <p>Precio: ${producto.price}</p>
        <button>Agregar al carrito</button>
        `

        // Agrego el <div> al contenedor de tarjetas
        contenedorTarjetas.appendChild(nuevoProducto); //
        nuevoProducto.getElementByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
        
    });
}
//envio el array de donde tiene que cargar
crearTarjetasProductoInicio(item) //item?


// Función para agregar productos al carrito (debe estar definida)
function agregarAlCarrito(producto) {
    console.log(`Producto agregado al carrito: ${producto.title}`);
    // Aquí puedes añadir la lógica para agregar el producto al carrito
}

// Fetch para obtener los productos de la API
fetch(url)
    .then(res => res.json())
    .then(data => {
        crearTarjetasProductoInicio(data);
    })
    .catch(err => console.log(err));*/