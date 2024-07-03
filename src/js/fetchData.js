//fetch para todas las rutas//generico/
//para que viaje en el post options/
function fetchData(url, method, callback,data = null){
    const options = {
        method: method,
        headers: {
            'Content-Type':'application/json',
        },
        body:data? JSON.stringify(data):null, //si hay datos los conviernea json y
    };
    fetch(url,options)
    .then(response => response.json())
    .then(data=> {
        callback(data);
    })
    .catch(error => console.log("Ocurrio un error! " + error));
}