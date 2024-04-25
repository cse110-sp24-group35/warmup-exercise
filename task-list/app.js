document.addEventListener('DOMContentLoaded', function () {
    initTasks();
    document.getElementById('addTaskForm').addEventListener('submit', addTask);
});

let tasks = []; // Global array to store tasks

// Initialize tasks from JSON file and setup the application
function initTasks() {
    fetch('data/tasks.json')
        .then(response => response.json())
        .then(data => {
            tasks = data.tasks; // Load tasks into the global array
            displayTasks(); // Display all tasks initially loaded
        })
        .catch(error => console.error('Error loading tasks:', error));
}

// Add a new task
function addTask(event) {
    event.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const taskDeadline = document.getElementById('taskDeadline').value;
    let taskPriority;
    const priorityButtons = document.getElementsByName('taskPriority');
    
    for (let button of priorityButtons) {
        if (button.checked) {
            taskPriority = button.value;
            break;
        }
    }
    
    const taskTags = document.getElementById('taskTags').value.split(',').map(tag => tag.trim());

    const newTask = {
        name: taskName,
        deadline: taskDeadline,
        priority: taskPriority,
        tags: taskTags
    };

    tasks.push(newTask); // Add to global tasks array
    displayTasks(); // Update display to show all tasks

    document.getElementById('addTaskForm').reset(); // Clear form after submission
}

// Display tasks in the UI
function displayTasks() {
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
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    displayTasks();
}

// Filter tasks by tag
function filterTasks() {
    const tag = prompt("Enter the tag to filter by:");
    const filteredTasks = tasks.filter(task => task.tags.includes(tag));
    displayTasks(filteredTasks);
}
