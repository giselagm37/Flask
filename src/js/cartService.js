//funcionalidad del carrito

function agregarAlCarrito(producto){
    //preguntamos si hay algo en la memoria
    //JSON.parse ES POR QUE LO RECIBE COMO STRING y necesito que sea un array
    const memoria = JSON.parse(localStorage.getItem("items"));
    console.log(memoria);
    let cuenta=0;
   //si no existe memoria
    if(!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        //agregamos una bicicleta
        localStorage.setItem("items",JSON.stringify([nuevoProducto]));
        cuenta=1;
    //si en la memoria ya existe agrego y si no que lo agregue o agregue otro
    } else {
        //revisa memoria
        //busca en que orden del array esta el producto al que se hizo clic  
        const indiceProducto = memoria.findIndex(item => item.id)
        console.log(indiceProducto)
        //sino lo encuentra
        if(indiceProducto === -1){
            const nuevaMemoria = memoria;
            //creamos la memoria con el producto
            //CREAMOS UNA FUNCION
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            cuenta=1;
        } else {
            //agrega
            nuevaMemoria[indiceProducto].cantidad ++;
            cuenta = nuevaMemoria[indiceProducto].cantidad;
        } 
            localStorage.setItem("items",JSON.stringify(nuevaMemoria));
            
        }
    actualizarNumeroCarrito();
    return cuenta;
}
//RESTAR
function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("items"));
    const indiceProducto = memoria.findIndex(item => item.id === producto.id);
    //SI EN EL INDICE DE PRODUCTO HAY 1 TIENE QUE BORRAR TODO EL ELEMETO
    if(memoria[indiceProducto].cantidad ===  1){
        //si tiene 1 lo borra
        memoria.splice(indiceProducto,1); //splice sacar el elemento
        
    }else{
        memoria[indiceProducto].cantidad --;
    }
    localStorage.setItem("items",JSON.stringify(memoria));
    actualizarNumeroCarrito();
}



/*TOMA UN PRODUCTO, LE AGREGA LA CANTIDAD 1 Y LO DEVUELVE */
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    //AGREGA
    nuevoProducto = 1;
    return nuevoProducto;
}
/**/
const cuentaCarritoElement = document.getElementById("cuenta-carrito");

function actualizarNumeroCarrito(){
    //contamos productos de la memoria
    const memoria = JSON.parse(localStorage.getItem("items"));
    
    if(cuenta && memoria.length > 0){
        //reduce sirve para agarrar array de cosas y reducirlo a un valor
        //la cuenta se guarda en cuenta
        const cuenta = memoria.reduce((acum, current) => acum +current.cantidad,0); //reduce reduce a 1 numero
       
        cuentaCarritoElement.innerText = cuenta;
        console.log(cuenta)
     } else {
        cuentaCarritoElement.innerHTML=0;
     }
     
}
//cada vez que se recarga el numero esta correcto
//index y ca
actualizarNumeroCarrito();