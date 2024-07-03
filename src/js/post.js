//Contenedor donde se dibujan las tareas
let taskContainer = document.querySelector(".tareas-container");


//Template de tareas 
let taskPendingTemplateReference = document.querySelector(".tarea.pendiente.template");
let taskCompletedTemplateReference = document.querySelector(".tarea.completada.template");
let taskArchivedTemplateReference = document.querySelector(".tarea.archivada.template");

let pendingtask = taskPendingTemplateReference.cloneNode(true);
let completeTask = taskCompletedTemplateReference.cloneNode(true);
let Archivedtask = taskArchivedTemplateReference.cloneNode(true);

//quito del documento los templates
taskPendingTemplateReference.remove(),
taskCompletedTemplateReference.remove(),
taskArchivedTemplateReference.remove()



fetchData(
    "http://localhosta:5000/api/tasks/pending/",
    "GET",
    (data) => {
        console.log(data);
        let tareas = [];
        //Recrro la lista de tareas obtenidas
        for (const tarea in data){
            console.log(tarea);
            //Duplico la plantilla de tarea pendiente
            let newTask = pendingTask.cloneNode(true);
            //Completo la tarea nueva con lo datos reales
            newTask.querySelector("h3.titulo").innerHTML = tarea.nombre;
            newTask.querySelector(".descripcion").innerHTML = tarea.descripcion;
            newTask.querySelector(".fecha").innerHTML = tarea.fecha_creacion;
            newTask.querySelector(".task_id").value = tarea.id;
            //Agrego la nueva tarea al listado de tareas para ver en el viewport
            tareas.push(newTask);
        }
        //Accion doble:
        //ReplaceChildren borra todo el contenido interno y agrega lo que yo le diga
        //desempaquetado
        taskContainer.replaceChildren(...tareas);
    }
);