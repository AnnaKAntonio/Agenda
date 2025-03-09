const days = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
const calendar = document.getElementById('calendar');

// Carregar tarefas do armazenamento local
const loadTasks = () => JSON.parse(localStorage.getItem('tasks')) || {};
const saveTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));

let tasks = loadTasks();

days.forEach(day => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');

    const title = document.createElement('h3');
    title.innerText = day;
    dayDiv.appendChild(title);

    const tasksDiv = document.createElement('div');
    tasksDiv.classList.add('tasks');
    dayDiv.appendChild(tasksDiv);

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Add task...';
    input.classList.add('add-task');

    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && input.value.trim() !== '') {
            addTask(day, input.value, false, tasksDiv);
            input.value = '';
        }
    });

    dayDiv.appendChild(input);
    calendar.appendChild(dayDiv);

    // Carregar tarefas salvas
    if (tasks[day]) {
        tasks[day].forEach(task => addTask(day, task.text, task.completed, tasksDiv));
    }
});

function addTask(day, text, completed, tasksDiv) {
    const task = document.createElement('p');
    task.innerText = text;
    if (completed) task.classList.add('completed');

    const completeBtn = document.createElement('button');
    completeBtn.innerText = '✔';
    completeBtn.classList.add('complete-task');
    completeBtn.onclick = () => toggleComplete(day, text, task);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.classList.add('delete-task');
    deleteBtn.onclick = () => removeTask(day, text, task);

    task.appendChild(completeBtn);
    task.appendChild(deleteBtn);
    tasksDiv.appendChild(task);

    // Salvar no localStorage
    if (!tasks[day]) tasks[day] = [];
    tasks[day].push({ text, completed });
    saveTasks(tasks);
}

function toggleComplete(day, text, taskElement) {
    tasks[day] = tasks[day].map(task => {
        if (task.text === text) task.completed = !task.completed;
        return task;
    });

    saveTasks(tasks);
    taskElement.classList.toggle('completed');
}

function removeTask(day, text, taskElement) {
    tasks[day] = tasks[day].filter(task => task.text !== text);
    saveTasks(tasks);
    taskElement.remove();
}
