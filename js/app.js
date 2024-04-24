// Variables
const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tweets');
let tareas = [];

// Event listener
eventListeners();

function eventListeners(){
  // --> Cuando el usuario agrega una nueva tarea
  formulario.addEventListener('submit', agregarTarea);

  // --> Cuando el documento ya está listo
  document.addEventListener('DOMContentLoaded', () => {
    tareas = JSON.parse( localStorage.getItem('tareas') ) || [];

    console.log(tareas);
    crearHtml();
  })
}



// Funciones
function agregarTarea(e) {
  e.preventDefault();

  // Textarea donde el usuario escribe
  const tarea = document.querySelector('#tweet').value;  //--> accedemos al valor del tecto introducido 

 // --> Validacion (para evitar texto en blanco)
 if(tarea === '') {
  mostrarError('Debes escribir una tarea..');  
  return; //--> evita que se siga ejecutando mas lineas de codigo (es necesario en la validacion), solo funciona dentro del if si esta dentro de uan function
 }
 
 // --> Método para evitar que una tarea se repita (Date.now)
 const tareasObj = {
  id: Date.now(),
  tarea: tarea,
 }

 // --> Añadir una tarea al array de tareas
 tareas = [...tareas, tareasObj];
 // --> Crear el listado en html de cada tarea
 crearHtml();

 // Reiniciar el formulario donde agregue la tarea 
  formulario.reset();
 }

 function crearHtml() {

  LimpiarHtml();

  if(tareas.length > 0) {
   tareas.forEach ( tarea => {
      // Agreagar un boton de eliminar
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.textContent = 'X';

      // Llamar la funcion de eliminar al hacer click en la X
      btnEliminar.onclick = () => {
        borrarTarea(tarea.id);
      }

      // Crear el html
      const textoTarea = document.createElement('li');
      textoTarea.textContent = tarea.tarea;

      // Asignar la X el botón eliminar
      textoTarea.appendChild (btnEliminar);

      // insertar la tarea en la lista de tareas
      listaTareas.appendChild (textoTarea);
   });
  }
  // --> Llamar a la funcion para almacenar en localStorage
  sincronizarStorage();
 }

 // --> Almacenar las tareas en el localStorage
 function sincronizarStorage(){
  localStorage.setItem('tareas', JSON.stringify(tareas));
 }

 // --> Función Elimiar una tarea al hacer click
 function borrarTarea (id) {
  tareas = tareas.filter( tarea => tarea.id !== id);

  crearHtml();
 }
  
 // --> Limpiar el html para evitar que se repita.
 function LimpiarHtml() {
  while( listaTareas.firstChild) {
    listaTareas.removeChild(listaTareas.firstChild)
  }
 }
 

// --> Mostrar mensaje de error generado con texto html y css 
function mostrarError(error) {
  // 1.- Creamos un nuevo párrafo HTML para mostrar el mensaje de error
  const mensajeError = document.createElement('p');
  // 2.- Establecemos el texto del párrafo con el mensaje de error proporcionado
  mensajeError.textContent = error;
  // 3.- Agregamos una clase CSS al párrafo para darle estilos de error
  mensajeError.classList.add('error');
  // 4.- Obtenemos el elemento HTML con el ID 'contenido' donde queremos mostrar el mensaje de error
  const contenido = document.querySelector('#contenido');
  // 5.- Agregamos el párrafo de error al final del contenido de la página
  contenido.appendChild(mensajeError);
  // 6.- Elimina el mensaje después de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}
