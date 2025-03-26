// Selección de elementos del DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Función para cargar tareas desde Local Storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Cargar tareas o inicializar
  tasks.forEach(taskText => createTaskElement(taskText)); // Crear elementos en la lista
}

// Función para guardar tareas en Local Storage
function saveTasks() {
const tasks = [];
document.querySelectorAll('#taskList li span').forEach(taskSpan => {
    tasks.push(taskSpan.textContent);
});
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Guardar como cadena JSON
}

// Función para crear un elemento de tarea
function createTaskElement(taskText) {
const taskItem = document.createElement('li');

  // Texto de la tarea
const taskSpan = document.createElement('span');
taskSpan.textContent = taskText;
taskItem.appendChild(taskSpan);

  // Botón de editar
const editBtn = document.createElement('button');
editBtn.textContent = 'Editar';
editBtn.onclick = () => editTask(taskItem, taskSpan);
taskItem.appendChild(editBtn);

  // Botón de eliminar
const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Eliminar';
deleteBtn.onclick = () => {
    taskItem.remove(); // Eliminar tarea visualmente
    saveTasks(); // Actualizar el almacenamiento
};
taskItem.appendChild(deleteBtn);

  // Añadir tarea a la lista
taskList.appendChild(taskItem);
}

// Función para añadir una tarea nueva
function addTask() {
  const taskText = taskInput.value.trim(); // Elimina espacios en blanco
  if (taskText === '') return; // No añadir si está vacío

  createTaskElement(taskText); // Crear la tarea visualmente
  saveTasks(); // Guardar en Local Storage
  taskInput.value = ''; // Limpiar el campo de entrada
}

// Función para editar una tarea
function editTask(taskItem, taskSpan) {
  const currentText = taskSpan.textContent; // Obtener el texto actual
const editInput = document.createElement('input');
editInput.type = 'text';
editInput.value = currentText;

const saveBtn = document.createElement('button');
saveBtn.textContent = 'Guardar';
saveBtn.onclick = () => {
    taskSpan.textContent = editInput.value.trim() || currentText; // Guardar texto editado
    taskItem.replaceChild(taskSpan, editInput); // Volver al texto original
    taskItem.replaceChild(editBtn, saveBtn); // Reemplazar botón "Guardar" con "Editar"
    saveTasks(); // Actualizar el almacenamiento
};

  const editBtn = taskItem.querySelector('button:nth-child(2)'); // Botón "Editar"
  taskItem.replaceChild(editInput, taskSpan); // Reemplazar el texto con un campo de entrada
  taskItem.replaceChild(saveBtn, editBtn); // Reemplazar botón "Editar" con "Guardar"
}

// Evento para el botón "Añadir"
addTaskBtn.addEventListener('click', addTask);

// Evento para añadir tarea al presionar "Enter"
taskInput.addEventListener('keypress', (e) => {
if (e.key === 'Enter') addTask();
});

// Cargar tareas al cargar la página
loadTasks();