document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    document.getElementById('addTaskForm').addEventListener('submit', addTask);
});

// Add a new task
function addTask(event) {
    event.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const taskDeadline = document.getElementById('taskDeadline').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskTags = document.getElementById('taskTags').value.split(',').map(tag => tag.trim());

    const newTask = {
        name: taskName,
        deadline: taskDeadline,
        priority: taskPriority,
        tags: taskTags
    };

    // Assuming tasks are stored in a global array for simplicity
    tasks.push(newTask);
    displayTasks(tasks);

    // Clear form after submission
    document.getElementById('addTaskForm').reset();
}

// Load tasks from the JSON file and display them
function loadTasks() {
    fetch('data/tasks.json')
        .then(response => response.json())
        .then(data => {
            displayTasks(data.tasks);
        })
        .catch(error => console.error('Error loading tasks:', error));
}

// Display tasks in the UI
function displayTasks(tasks) {
    const taskList = document.getElementById('taskItems');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.name} - Deadline: ${task.deadline} - Priority: ${task.priority}`;
        taskList.appendChild(li);
    });
}

// Sort tasks by deadline
function sortTasks() {
    fetch('data/tasks.json')
        .then(response => response.json())
        .then(data => {
            const sortedTasks = data.tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
            displayTasks(sortedTasks);
        })
        .catch(error => console.error('Error sorting tasks:', error));
}

// Filter tasks by tag
function filterTasks() {
    const tag = prompt("Enter the tag to filter by:");
    fetch('data/tasks.json')
        .then(response => response.json())
        .then(data => {
            const filteredTasks = data.tasks.filter(task => task.tags.includes(tag));
            displayTasks(filteredTasks);
        })
        .catch(error => console.error('Error filtering tasks:', error));
}

// Keyboard navigation support (basic example)
document.addEventListener('keydown', function (event) {
    const key = event.key;
    switch (key) {
        case 's':
            sortTasks();
            break;
        case 'f':
            filterTasks();
            break;
    }
});
