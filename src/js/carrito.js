
// Selecciona el contenedor donde se agregarán las tarjetas de producto
const contenedorTarjetas = document.getElementById("productos-container");
console.log(contenedorTarjetas);  // Asegúrate de que este contenedor existe y se está seleccionando correctamente

// URL de la API
const url = 'https://fakestoreapi.com/products';

// Función para crear tarjetas de productos
function crearTarjetasProductosInicio(productos) {
    productos.forEach(producto => {
        // Creo un elemento <div> para cada producto
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "tarjeta-producto";

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
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => 
            agregarAlCarrito(producto));
    });
}

// Función para agregar productos al carrito (debe estar definida)
function agregarAlCarrito(producto) {
    console.log(`Producto agregado al carrito: ${producto.title}`);
    // Aquí puedes añadir la lógica para agregar el producto al carrito
}

// Fetch para obtener los productos de la API
fetch(url)
    .then(res => res.json())
    .then(data => {
    
        crearTarjetasProductosInicio(data);
    })
    .catch(err => console.log(err));


