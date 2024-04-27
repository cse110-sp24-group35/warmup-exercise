document.addEventListener('DOMContentLoaded', function () {
    initTasks();
    document.getElementById('addTaskForm').addEventListener('submit', addTask);
});

let tasks = []; // Global array to store tasks
let ogTasks = []; // Store tasks in original order

// Initialize tasks from JSON file and setup the application
function initTasks() {
    fetch('data/tasks.json')
        .then(response => response.json())
        .then(data => {
            tasks = data.tasks; // Load tasks into the global array
            ogTasks = [...tasks];
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
    ogTasks = [...tasks];
    displayTasks(); // Update display to show all tasks

    document.getElementById('addTaskForm').reset(); // Clear form after submission
}

// Display tasks in the UI
function displayTasks() {
    const taskList = document.getElementById('taskItems');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
        const liDiv = document.createElement('div'); // Create "box" for each element
        liDiv.classList.add("taskEntryContainer");
        const liTextDiv = document.createElement('div'); // Separates button from text

        const li = document.createElement('li'); //Create the list item with main text
        li.textContent = `${task.name} `;
        li.classList.add(task.priority);

        const liDeadline = document.createElement('p');
        liDeadline.textContent = `- Deadline: ${task.deadline}`;

        const tags = document.createElement('p'); //Creates tags element
        tags.textContent = ` - Tags: ${task.tags}`;

        const liButton = document.createElement('button'); // Create "box" for each element

        liDiv.appendChild(liButton);
        liTextDiv.appendChild(li);
        liTextDiv.appendChild(liDeadline)
        liTextDiv.appendChild(tags);
        liDiv.appendChild(liTextDiv);

        taskList.appendChild(liDiv);
    });
}

// Sort tasks by deadline
function sortTasks() {
    const checkbox = document.getElementById('defaultOrNot');
    if (checkbox.checked) {
        // Sort by deadline
        tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else {
        // Revert to original order
        tasks = [...ogTasks];

    }
    displayTasks();
}

// Filter tasks by tag
function filterTasks() {
    const tag = prompt("Enter the tag to filter by:");
    const filteredTasks = tasks.filter(task => task.tags.includes(tag));
    tasks = filteredTasks;
    displayTasks();
    tasks = [...ogTasks];
}

