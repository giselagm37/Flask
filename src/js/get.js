let submitButton = document.querySelector("#Formulario #Crear");

submitButton.addEventListener("click",() => {
    let data_post ={
        'nombre': document.querySelector("#Formulario #Titulo").value,
        'descripcion':document.querySelector("#Formulario #Descripcio").value
    }
    fetchData(
        "http://localhost:5000/api/tasks/create/",
        "POST",
        (data) => {
            //limpia el formulario
            document.querySelector("#Formulario").reset();
            window.location.replace("../index.html#TareasPendientes");
        },
        data_post
    )
})